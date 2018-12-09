//Libraries
const express = require('express');
const bodyParser = require('body-parser');
const util = require('./api/utility.js');
//Environment
const PORT = process.env.PORT || 3000

//Api init imports. Aggiungere qui import ai file delle implemetazioni
const reviewApi = require('./api/review.js');
const submissionApi = require('./api/submission.js');
const examsApi = require('./api/exams.js');
//const groupApi = require('./api/group.js');
const userApi = require('./api/user.js');

//Versioned flag. true = api on http://localhost/V1 , false = api on http://localhost
const versioned = true;

//Create app
const app = express();
//Use bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routerToInit = app if not versioned, versionV1 if versioned;
var routerToInit = app;
if (versioned){
	//Create V1 router
	const versionV1 = express.Router();
	routerToInit = versionV1;
	//User api router on /V1 path
	app.use('/V1', versionV1);
}

//Log all the http requests (method + url) to the api router
routerToInit.use(function(req, res, next) {
  util.log("API",req.method+" "+getFullUrl(req));
  next();
});

//Init router with api request. Aggiungere qui tutti gli init alle api che volete aggiugnere.
reviewApi.init(routerToInit);
submissionApi.init(routerToInit);
examsApi.init(routerToInit);
//groupApi.init(routerToInit);
userApi.init(routerToInit);

//Set the home response
app.get('/', (req, res) => res.send('Welcome to the most beautiful api ever'));
//Start the server on port
app.listen(PORT, () => console.log('Starting server app on port '+ PORT))

//Get full request url from request object
function getFullUrl(req){
	return req.protocol + '://' + req.get('host') + req.originalUrl;
}
