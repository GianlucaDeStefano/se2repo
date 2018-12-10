/*
	/task path server implementation


*/

//using express as HTTP server
var express = require('express');

//importing database and utility functions
var db = require('./api/database.js');
var util = require('./api/utility.js');

//setting macros
const tag = 'TASK';
const tasks_table = 'tasks';
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


//***************** METHODS IMPLEMENTATION *****************

/*
	method: GET
	path: /tasks
*/
app.get('/tasks', function (req, res) {

	//retrieves list of available tasks from the database
	var tasks = db.getList(tasks_table);

	//if there is no tasks present, sends a "204 No content" response
	if(util.isNull(tasks)){

		//sending response
		res.status(204).send();
		util.log(tag, 'Sent "204 No content" response');
		return;
	}

	//logs activity
	util.log(tag, 'Retrieved tasks: ' + tasks);

	//if found send the tasks list
	res.status(200);
	res.send(util.json(tasks));
	util.log(tag, 'Sent "200 OK" response');
});

/*
	method: POST
	path: /tasks
*/
app.post('/tasks', function (req, res) {

	//getting data from request body
	var owner_id = req.body['owner_id'];
	var questions = req.body['questions'];

	//if request body data not right sends a "400" response
	if(!util.isInteger(owner_id) | owner_id < 0 | !util.isArray(questions) | questions.length < 1){

		//sending response
		res.status(400).send();
		util.log(tag, 'Sent "400 Error" response');

		return;
	}

	//otherwise tries to insert data in the database
	//success --> sends a "201 Created" response
	//fail --> sends a "500 Internal Server Error" response

	//generating a new id for the task to be inserted in the database
	var id = db.generateId(tasks_table);
	//inserting task in the database
	var task = db.task(id, owner_id, questions);

	//if an internal database error occurs we send a "500 Internal Server Error" response
	if(!db.insert(tasks_table, task)){

		//sending response
		res.status(500).send();
		util.log(tag, 'Sent "500 Internal Server Error" response');

		return;
	}

	//logging activity
	util.log(tag, 'Created: ' + util.json(task));
	//otherwise we send a "201 Created" response and the task object created
	res.status(201);
	res.send(util.json(task));
	util.log(tag, 'Sent "201 Created" response');
});

/*
	method: GET
	path: /tasks/:task_id
*/
app.get('/tasks/:task_id', function (req, res) {

	//catching the task_id from the request path
	var task_id = Number(req.params.task_id);

	//if the task_id isn't a legal id we send a "400 Bad Request" response
	if(!util.isInteger(task_id) | task_id < 0 ){

		//sending response
		res.status(400).send();
		util.log(tag, 'Sent "400 Bad Request" response');

		return;
	}

	//otherwise tries to retrieve the task from the database
	var task = db.findBy(tasks_table, 'task_id', task_id);

	//if no task found in the database sends a "404 Not Found" response
	if(util.isNull(task)){

		//sending response
		res.status(404).send();
		util.log(tag, 'Sent "404 Not Found" response');

		return;
	}

	//logs activity
	util.log(tag, 'Retrieved task: ' + util.json(task));

	//otherwise sends the task object
	res.status(200);
	res.send(util.json(task));
});

/*
	method: PATCH
	path: /tasks/:task_id
*/
app.patch('tasks/:task_id', function (req, res) {

	//catching the task_id from the request path
	var task_id = Number(req.params.task_id);

	//catching task update data from the body
	var owner_id = req.body['owner_id'];
	var questions = req.body['questions'];

	//if the task_id/owner_id isn't a legal id or questions isn't a valid array, sends a "400 Bad Request" response
	if(!util.isInteger(task_id) | task_id < 0 | !util.isInteger(owner_id) | owner_id < 0 | !util.isArray(questions) | questions.length < 1){

		//sending response
		res.status(400).send();
		util.log(tag, 'Sent "400 Bad Request" response');

		return;
	}

	//otherwise tries to retrive the task from the database
	var present_task = db.findBy(tasks_table, 'task_id', task_id);

	//if no task found in the database sends a "404 Not Found" response
	if(util.isNull(task)){

		//sending response
		res.status(404).send();
		util.log(tag, 'Sent "404 Not Found" response');

		return;
	}

	//otherwise tries to update the task in the database (by cancelling and re-adding it)
	//deleting the old task
	db.deleteBy(tasks_table, 'task_id', task_id);

	var task_update = db.task(task_id, owner_id, questions);
	//inserting the new updated task
	db.insert(tasks_table, task_update);

	//logging activity
	util.log(tag, 'Updated task: ' + util.json(task_update));

	//sending response and the task object
	res.status(200);
	res.send(util.json(task_update));

});

/*
	method: DELETE
	path: /tasks/:task_id
*/
app.delete('tasks/:task_id', function (req, res) {

	//catching the task_id from the request path
	var task_id = Number(req.params.task_id);

	//if the task_id isn't a legal id, sends a "400 Bad Request" response
	if(!util.isInteger(task_id) | task_id < 0){

		//sending response
		res.status(400).send();
		util.log(tag, 'Sent "400 Bad Request" response');

		return;
	}

	//otherwise tries to delete the task from the database
	var deleted = db.deleteBy(tasks_table, 'task_id', task_id);

	//if hasn't been deleted means the task wasn't found in the database and sends a "404 Not Found" response
	if(!deleted){

		//sending response
		res.status(404).send();
		util.log(tag, 'Sent "404 Not Found" response');

		return;
	}

	//logs activity
	util.log(tag, 'Deleted task with task_id: ' + task_id);

	//if it has been successfully deleted we send a "204 No Content" response
	res.status(204).send();
});
