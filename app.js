/*
	/exams path server implementation

	Includes:
		* [GET - POST] /exams
*/

//using express as HTTP server
var express = require('express');

//importing database and utility functions
var db = require('./api/database.js');
var util = require('./api/utility.js');

//setting macros
const tag = 'EXAMS';
const exams_table = 'exams';
const submissions_table = 'submissions';
const users_table = 'users';
const version = 'V1';

//setting public root path
const app = express();
app.use('/' + version + '/', express.static('public'));

//starting the server
var port = process.env.PORT || 3000;
app.listen(port, function(){
	util.log(tag, 'Server running in port: ' + port);
});
