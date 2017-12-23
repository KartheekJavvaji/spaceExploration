// Some lines contain just a single variable. This has been done to support Quokka.js functionality, which is very helpful for live debugging
const   _               =   require('lodash'),
        fetch           =   require('fetch-retry'), //- for QUOKKA
        dateFormat      =   require('dateformat'); //- for QUOKKA
//SPACE OPEN API KEY - for QUOKKA
const API_KEY = "RioAxhYhTzbsQYi7ufl2JW69FfowN4GyRHLeOkM4";

const requestUrlGen = (endpoint, params, API_KEY) => {
    let reqUrl = endpoint + API_KEY;
    for(const param in params){
        reqUrl += `&${param}=${params[param]}`
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
            const { status } = response;
            if( _.includes([404, 403], status) ) {
                throw ({
                    status,
                    msg:status === 404? 'Requested url not found': 'Invalid API key',
                    errObj: response
                })
            } 
            return response.json()
        })
        .then(result => {
            const { code } = result
            if( _.includes([500, 400], code) ) {
                throw ({
                    status: code,
                    msg: code === 500? 'Internal Server Error': 'Bad params',
                    errObj: result
                })
            } 
            resolve(result)
        })
        .catch(err => {
            console.log(`Error at ${new Date()}:`, err)
            // throw 'An error' or throw new Error('An error'):
            // http://www.nczonline.net/blog/2009/03/10/the-art-of-throwing-javascript-errors-part-2/
            err;
            resolve(_.omit(err, 'errObj'))
        })
    })
}

const APOD = "https://api.nasa.gov/planetary/apod?api_key=";
const apodParams = {
    date: dateFormat(new Date(), "yyyy-mm-dd"),
    hd: true
};

    r = fetchJson(requestUrlGen(APOD, apodParams, API_KEY))
        .then((response) => response)
    r;

module.exports = { requestUrlGen, fetchJson }