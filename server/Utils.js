// Some lines may contain just a single variable. This has been done to support Quokka.js functionality, which is very helpful for live debugging
const _ = require('lodash');
fetch = require('fetch-retry');
constants = require('./constants');
tz = require('timezone/loaded');

//Constants
const {
  ERROR_MESSAGES
} = constants;

const getValidDate = (dateString) => {
  const today = new Date();
  const POSIXTime = tz(today, '%Y-%m-%d');
  if(_.isEmpty(dateString)) {
    return POSIXTime;
  }
  // We get the UTC date and time, but when a Date obj is created from it, it would be treated as local timezone
  const UTC = new Date(POSIXTime);
  const givenDate = new Date(dateString);
  if(givenDate > UTC) {
    return POSIXTime;
  }
  return dateString;
}

const requestUrlGen = (endpoint, API_KEY, params) => {
  let reqUrl = `${endpoint}?api_key=${API_KEY}`;
  if (params) {
    for (const param in params) {
      reqUrl += `&${param}=${params[param]}`
    }
  }
  return reqUrl;
}

const fetchJson = (reqUrl) => {
  return new Promise((resolve, reject) => {
    fetch(reqUrl, {
      retries: 2,
      retryDelay: 500
    })
      .then(response => {
        console.log('response: ', response);
        const {
          status,
          statusText
                } = response;
        if (status !== 200) {
          console.log('Response error status: ', status, statusText);
          throw ({
            status,
            msg: ERROR_MESSAGES[status],
            errObj: response
          })
        }
        return response.json()
      })
      .then(result => {
        console.log('Result: ', result);
        const {
          code,
          statusText
                } = result
        if (code && code !== 200) {
          console.log('ResponseJson error status:', code, statusText);
          throw ({
            status: code,
            msg: ERROR_MESSAGES[code],
            errObj: result
          })
        }
        resolve(result)
      })
      .catch(err => {
        console.log(`Error at ${new Date()}:`, err)
        // throw 'An error' or throw new Error('An error'):
        // http://www.nczonline.net/blog/2009/03/10/the-art-of-throwing-javascript-errors-part-2/
        resolve(_.omit(err, 'errObj'))
      })
  })
}

const addDays = (date, numberOfDays) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numberOfDays);
  return newDate;
}

module.exports = {
  requestUrlGen,
  fetchJson,
  addDays,
  getValidDate
}