//importing database and utility functions
var db = require('./database.js');
var util = require('./utility');

function init(app){

	//setting macros
	const tag = 'EXAMS';
	const exams_table = 'exams';
	const submissions_table = 'submissions';
	const users_table = 'users';



	//**************************** METHODS IMPLEMENTATION ****************************

	/*
		method: GET
		path: /exams
	*/
	app.get('/exams', (req, res) => {

		//retrieves the entire list of available exams from the database
		var exams = db.getList(exams_table);

		//if no exams present sends a "204 No content" response
		if(util.isNull(exams) | exams.length == 0){
			//sending response
			res.status(204).send();
			util.log(tag, 'Sent "204 No content" response');
			return;
		}

		//logs activity
		util.log(tag, 'Retrieved exams: ' + exams);

		//otherwise sends the exams list
		res.status(200);
		res.send(util.json(exams));
		util.log(tag, 'Sent "200 OK" response');
	});

	/*
		method: POST
		path: /exams
	*/
	app.post('/exams', (req, res) => {

		//getting data from request body
		var owner_id = req.body['owner_id'];
		var questions = req.body['questions'];

		//if request body data not right sends a "400 Bad Request" response
		if(!util.isInteger(owner_id) | owner_id < 0 | !util.isArray(questions) | questions.length < 1){
			//sending response
			res.status(400).send();
			util.log(tag, 'Sent "400 Bad Request" response');
			return;
		}

		//otherwise tries to insert data in the database
		//generating a new id for the exam to be inserted in the database
		var id = db.generateId(exams_table);
		//inserting exam in the database
		var exam = db.exam(id, owner_id, questions);

		//if an internal database error occurs we send a "500 Internal Server Error" response
		if(!db.insert(exams_table, exam)){
			//sending response
			res.status(500).send();
			util.log(tag, 'Sent "500 Internal Server Error" response');
			return;
		}

		//logging activity
		util.log(tag, 'Created: ' + util.json(exam));

		//otherwise we send a "201 Created" response and the exam object created
		res.status(201);
		res.send(util.json(exam));
		util.log(tag, 'Sent "201 Created" response');
	});

	/*
		method: GET
		path: /exams/:exam_id
	*/
	app.get('/exams/:exam_id', (req, res) => {

		//catching the exam_id from the request path
		var exam_id = Number(req.params.exam_id);

		//if the exam_id isn't a legal id we send a "400 Bad Request" response
		if(!util.isInteger(exam_id) | exam_id < 0 ){
			//sending response
			res.status(400).send();
			util.log(tag, 'Sent "400 Bad Request" response');
			return;
		}

		//otherwise tries to retrieve the exam from the database
		var exam = db.findBy(exams_table, 'exam_id', exam_id);

		//if no exam found in the database sends a "404 Not Found" response
		if(util.isNull(exam)){
			//sending response
			res.status(404).send();
			util.log(tag, 'Sent "404 Not Found" response');
			return;
		}

		//logs activity
		util.log(tag, 'Retrieved exam: ' + util.json(exam));

		//otherwise sends the exam object
		res.status(200);
		res.send(util.json(exam));
	});

	/*
		method: PATCH
		path: /exams/:exam_id
	*/
	app.patch('/exams/:exam_id', (req, res) => {

		//catching the exam_id from the request path
		var exam_id = Number(req.params.exam_id);

		//catching exam update data from the body
		var owner_id = req.body['owner_id'];
		var questions = req.body['questions'];

		//if the exam_id/owner_id isn't a legal id or questions isn't a valid array, sends a "400 Bad Request" response
		if(!util.isInteger(exam_id) | exam_id < 0 | !util.isInteger(owner_id) | owner_id < 0 | !util.isArray(questions) | questions.length < 1){
			//sending response
			res.status(400).send();
			util.log(tag, 'Sent "400 Bad Request" response');
			return;
		}

		//otherwise tries to retrive the exam from the database
		var present_exam = db.findBy(exams_table, 'exam_id', exam_id);

		//if no exam found in the database sends a "404 Not Found" response
		if(util.isNull(present_exam)){
			//sending response
			res.status(404).send();
			util.log(tag, 'Sent "404 Not Found" response');
			return;
		}

		//otherwise tries to update the exam in the database (by cancelling and re-adding it)
		//deleting the old exam
		db.deleteBy(exams_table, 'exam_id', exam_id);

		//inserting the new updated exam
		var exam_update = db.exam(exam_id, owner_id, questions);
		db.insert(exams_table, exam_update);

		//logging activity
		util.log(tag, 'Updated exam: ' + util.json(exam_update));

		//sending response and the exam object
		res.status(200);
		res.send(util.json(exam_update));
	});

	/*
		method: DELETE
		path: /exams/:exam_id
	*/
	app.delete('/exams/:exam_id', (req, res) => {

		//catching the exam_id from the request path
		var exam_id = Number(req.params.exam_id);

		//if the exam_id isn't a legal id, sends a "400 Bad Request" response
		if(!util.isInteger(exam_id) | exam_id < 0){
			//sending response
			res.status(400).send();
			util.log(tag, 'Sent "400 Bad Request" response');
			return;
		}

		//otherwise tries to delete the exam from the database
		var deleted = db.deleteBy(exams_table, 'exam_id', exam_id);

		if(deleted == null){
			res.status(500).send();
			util.log(tag, 'Sent "500 Internal Server Error" response');

			return;
		}

		//if hasn't been deleted means the exam wasn't found in the database and sends a "404 Not Found" response
		if(deleted == false){
			//sending response
			res.status(404).send();
			util.log(tag, 'Sent "404 Not Found" response');
			return;
		}

		//logs activity
		util.log(tag, 'Deleted exam with exam_id: ' + exam_id);

		//if it has been successfully deleted we send a "204 No Content" response
		res.status(204).send();
	});

	/*
		method: GET
		path: /exams/:exam_id/marks
	*/
	app.get('/exams/:exam_id/marks', (req, res) => {

		//catching the exam_id from the request path
		var exam_id = Number(req.params.exam_id);

		//if the exam_id isn't a legal id, sends a "400 Bad Request" response
		if(!util.isInteger(exam_id) | exam_id < 0){
			//sending response
			res.status(400).send();
			util.log(tag, 'Sent "400 Bad Request" response');
			return;
		}

		//otherwise tries to find the exam in the database
		var exam = db.findBy(exams_table, 'exam_id', exam_id);

		//if no exam found sends a "404 Not Found" response
		if(util.isNull(exam)){
			//sending response
			res.status(404).send();
			util.log(tag, 'Sent "404 Not Found" response');
			return;
		}

		//otherwise tries to retrieve every submission with the exam_id from the database
		var submissions = db.findListBy(submissions_table, 'exam_id', exam_id);

		//if no submission found in the database sends a "204 No Content" response
		if(util.isNull(submissions)){
			//sending response
			res.status(204).send();
			util.log(tag, 'Sent "204 Nn Content" response');
			return;
		}

		//logs activity
		util.log(tag, 'Retrieved exam: ' + util.json(exam));
		util.log(tag, 'Retrieved submissions with exam_id: ' + exam_id);

		//builds a user_id:mark objects vector
		var marks = [];
		submissions.forEach(function(item, index, array){
			marks.push({'user_id': item.user_id, 'mark': item.mark});
		});

		//logs activity
		util.log(tag, 'Sent marks: ' + util.json(marks));

		//sends a "200 OK" response and the mark object vector
		res.status(200);
		res.send(util.json(marks));
	});

	/*
		method: GET
		path: /exams/:owner_id/owner
	*/
	app.get('/exams/:owner_id/owner', (req, res) => {

		//catching the owner_id from the request path
		var owner_id = Number(req.params.owner_id);

		//if the owner_id isn't a legal id, sends a "400 Bad Request" response
		if(!util.isInteger(owner_id) | owner_id < 0){
			//sending response
			res.status(400).send();
			util.log(tag, 'Sent "400 Bad Request" response');
			return;
		}

		//tries to retrieve the user info
		var user = db.findBy(users_table, 'user_id', owner_id);

		//if no user present sends a "404 Not Found" response
		if(util.isNull(user)){
			//sending response
			res.status(404).send();
			util.log(tag, 'Sent "404 Not Found" response');
			return;
		}

		//retrieves the entire list of exams created by the owner from the database
		var exams = db.findListBy(exams_table, 'owner_id', owner_id);

		//if no exams present sends a "204 No content" response
		if(util.isNull(exams)){
			//sending response
			res.status(204).send();
			util.log(tag, 'Sent "204 No content" response');
			return;
		}

		//logs activity
		util.log(tag, 'Retrieved exams: ' + exams);

		//otherwise sends the exams list
		res.status(200);
		res.send(util.json(exams));
		util.log(tag, 'Sent "200 OK" response');
	});
	//********************************************************************************
}

module.exports = {init: init};
