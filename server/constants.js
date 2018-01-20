const API_KEY = 'RioAxhYhTzbsQYi7ufl2JW69FfowN4GyRHLeOkM4'

//Base urls
const BASE_URL_APOD = 'https://api.nasa.gov/planetary/apod'

const BASE_URL_NEOWS = 'https://api.nasa.gov/neo/rest/v1'
const BASE_URL_NEOWS_FEED = `${BASE_URL_NEOWS}/feed`
const BASE_URL_NEOWS_STATS = `${BASE_URL_NEOWS}/stats`
const BASE_URL_NEOWS_LOOKUP = `${BASE_URL_NEOWS}/neo`
const BASE_URL_NEOWS_DATA_SET = `${BASE_URL_NEOWS}/neo/browse`



//Error messages
const ERROR_MESSAGES = {
  400: 'Bad params',
  403: 'Invalid API key',
  404: 'Requested endpoint not found',
  405: 'Method not allowed',
  500: 'Internal server error'
}

module.exports = {
  API_KEY,
  ERROR_MESSAGES,
  BASE_URL_APOD,
  BASE_URL_NEOWS_FEED,
  BASE_URL_NEOWS_STATS,
  BASE_URL_NEOWS_LOOKUP,
  BASE_URL_NEOWS_DATA_SET
}