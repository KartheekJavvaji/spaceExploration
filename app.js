let fetch       =   require('node-fetch'),
bodyParser      =   require('body-parser'),
methodOverRide  =   require('method-override'),
dateFormat      =   require('dateformat'),
express         =   require('express'),
app             =   express();

//NASA OPEN API KEY
const API_KEY = "RioAxhYhTzbsQYi7ufl2JW69FfowN4GyRHLeOkM4";

//QUERY PARAMS: 
//date  -   YYYY-MM-DD
//hd    -   bool
const APOD = "https://api.nasa.gov/planetary/apod?api_key=";


let requestUrlGen = (endpoint, params) => {
    let reqUrl = endpoint + API_KEY;
    for(let param in params){
        reqUrl += (("&" + param  + "=").concat(params[param]));
    }
    reqUrl;
    return reqUrl;
}

//TRAIL API FETCH for APOD
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
    let apodParams = {};
    // have to know the exact time at which the new APOD is uploaded
    // apodParams['date'] = dateFormat(new Date(), "yyyy-mm-dd");
    apodParams['date'] = '2017-08-20';
    apodParams['hd'] =true;

    fetch(requestUrlGen(APOD, apodParams))
        .then((response) => response.json())
        .then((result) => response.send(JSON.stringify(result, null, 34)));
});


app.get('/', (request, response) => {
    response.redirect('/image-of-the-day');
});

app.listen(3000,() => {
    console.log("Server started!")
})