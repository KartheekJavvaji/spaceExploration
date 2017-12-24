// Some lines may contain just a single variable. This has been done to support Quokka.js functionality, which is very helpful for live debugging
const _ = require('lodash');

const requestUrlGen = (endpoint, API_KEY, params) => {
    let reqUrl = `${endpoint}?api_key=${API_KEY}`;
    if(params) {
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
    addDays
}