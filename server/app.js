const   dateFormat      =   require('dateformat'),
        express         =   require('express'),
        app             =   express(),
        Utils           =   require('./Utils');

//HELPER METHODS
const { fetchJson, requestUrlGen } = Utils;

//SPACE OPEN API KEY
const API_KEY = "RioAxhYhTzbsQYi7ufl2JW69FfowN4GyRHLeOkM4";

//QUERY PARAMS: 
//date  -   YYYY-MM-DD
//hd    -   bool
const APOD = "https://api.nasa.gov/planetary/apod?api_key=";

//-----------------------Example API FETCH for APOD-----------------------//
// let apodParams = {
//     date: '2017-03-21',
//     hd: false
// }
// let apodResponse = fetch(requestUrlGen(APOD, apodParams))
//                     .then((response) => {
//                         return response.json();
//                     })
//                     .then((responseJson) => {
//                         responseJson;
//                     });

app.get('/image-of-the-day', (request, response) => {
    const apodParams = {
        date: dateFormat(new Date(), "yyyy-mm-dd"),
        hd: true
    }
    fetchJson(requestUrlGen(APOD, apodParams, API_KEY))
        .then((result) => {
            response.send(result)
        })
})

app.get('/', (request, response) => {
    response.redirect('/image-of-the-day')
})

app.listen(3001,() => {
    console.log("Server started!");
})