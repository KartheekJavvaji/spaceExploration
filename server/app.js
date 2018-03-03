const dateFormat = require('dateformat'),
  express = require('express'),
  app = express(),
  helper = require('./helper'),
  constants = require('./constants');

//Helper methods
const {
  fetchJson,
  requestUrlGen,
  addDays,
  getValidDate
} = helper;

//Constants
const {
    API_KEY,
  BASE_URL_APOD,
  BASE_URL_NEOWS_FEED,
  BASE_URL_NEOWS_STATS,
  BASE_URL_NEOWS_LOOKUP,
  BASE_URL_NEOWS_DATA_SET
} = constants;

//------------------------------Middleware-------------------------------//
// Add headers
app.use(function (request, response, next) {

  // Website you wish to allow to connect
  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');

  // Request methods you wish to allow
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  response.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


//-----------------------Example API fetch for APOD-----------------------//
// Query params: 
// date - YYYY-MM-DD [today]
// hd   - bool       [false]

app.get('/image-of-the-day', (request, response) => {
  const requestedDate = getValidDate(request.query.date);
  const apodParams = {
    //TODO: user can select a particular date and get the apod of the same [should be in past]
    //date: dateFormat(new Date(), 'yyyy-mm-dd'),
    hd: true,
    date: requestedDate
  }
  console.log()
  fetchJson(requestUrlGen(BASE_URL_APOD, API_KEY, apodParams))
    .then((result) => {
      response.send(result)
    })
})

//-----------------------Example API fetch for Asteroids[FEED] - NeoWs: Near Earth Object Web Service-----------------------//
// Query params: 
// start_date - YYYY-MM-DD  [none]
// end_date	  - YYYY-MM-DD	[7 days after start_date]

app.get('/asteroids-passing-earth/', (request, response) => {
  const today = new Date();
  const neoWsFeedParams = {
    start_date: dateFormat(today, 'yyyy-mm-dd'),
    end_date: dateFormat(addDays(today, 5), 'yyyy-mm-dd')
  }
  fetchJson(requestUrlGen(BASE_URL_NEOWS_FEED, API_KEY, neoWsFeedParams))
    .then((result) => {
      response.send(result)
    })
})

//-----------------------Example API fetch for Asteroids[STATS] - NeoWs: Near Earth Object Web Service-----------------------//
app.get('/asteroids-passing-earth/stats', (request, response) => {
  fetchJson(requestUrlGen(BASE_URL_NEOWS_STATS, API_KEY))
    .then((result) => {
      response.send(result)
    })
})

//-----------------------Example API fetch for Asteroids[DATA SET] - NeoWs: Near Earth Object Web Service-----------------------//
app.get('/asteroids-passing-earth/index', (request, response) => {
  fetchJson(requestUrlGen(BASE_URL_NEOWS_DATA_SET, API_KEY))
    .then((result) => {
      response.send(result)
    })
})

//-----------------------Example API fetch for Asteroids[LOOKUP] - NeoWs: Near Earth Object Web Service-----------------------//
// Query params: 
// asteroid_id - int

app.get('/asteroids-passing-earth/:neoWsId', (request, response) => {
  const asteroid_id = request.params.neoWsId;
  fetchJson(requestUrlGen(`${BASE_URL_NEOWS_LOOKUP}/${asteroid_id}`, API_KEY))
    .then((result) => {
      response.send(result)
    })
})

app.get('/', (request, response) => {
  response.redirect('/image-of-the-day')
})

// app.listen(3001, () => {
//   console.log('Server started!');
// })
app.listen(process.env.PORT || 3000);