const util = require('./utility.js');
const database = require('./database.js');


function isAnswer(x){
	if (util.isNull(x)){
		return false;
	} else {
		return util.isString(x["text"]) && util.isBoolean(x["correct"]);
	}
}

function init(app){
	const TAG = "SUMBISSION";
	const TABLE = "submissions";
	
	//Create submission object and save it 
	app.post('/submissions', (req, res) => {
	   var user_id = req.body["user_id"];
	   var exam_id = req.body["exam_id"];
	   var answer = req.body["answer"];
	   if (!util.isInteger(user_id) || !util.isInteger(exam_id) || !util.isArray(answer)){
		   util.log(TAG, "Error: object properties wrong: "+util.json(req.body));
		   return res.status(400).send();
	   }
	   for (var i = 0; i<answer.length; ++i){
		   if (!isAnswer(answer[i])){
				util.log(TAG, "Error: answer is not valid: "+util.json(answer[i]));
			    return res.status(400).send();
		   }
	   }
		var id=database.generateId(TABLE);
		var submission = database.submission(id, user_id, exam_id, answer, -1);
	   if(!database.insert(TABLE, submission)){
		   util.log(TAG, "Error: failed to insert in database");
		   return res.status(500).send();
	   }
	   util.log(TAG, "Created: "+util.json(submission));
	   return res.json(submission);
	});

	//Get submission object by id
	app.get('/submissions/:submission_id', (req, res) => {
	   var submission_id = parseInt(req.params["submission_id"]);
	   
	   if (!util.isInteger(submission_id)){
		   util.log(TAG, "Error: id is not an integer: "+submission_id);
		   return res.status(400).send();
	   }
	   var submission = database.findBy(TABLE, "id", submission_id);
	   if (util.isNull(submission)){
		   util.log(TAG, "Error: failed to find submission with id "+submission_id+" in database");
		   return res.status(400).send();
	   }
	   submission
	   util.log(TAG, "Read: "+util.json(submission));
	   res.json(submission);
	});
	
	//give and update a vote to the submission
	app.patch('/submissions/:submission_id/mark', (req, res) => {
	   var submission_id = parseInt(req.params["submission_id"]);
	   var mark=parseInt(req.body["number"]);
	   if (!util.isInteger(submission_id) || !util.isInteger(mark)){
		   util.log(TAG, "Error: id is not an integer: "+submission_id);
		   return res.status(400).send();
	   }
	   var submission = database.findBy(TABLE, "id", submission_id);
	   if (util.isNull(submission)){
		   util.log(TAG, "Error: failed to find submission with id "+submission_id+" in database");
		   return res.status(404).send();
	   }
	   submission["mark"] = mark;
	   util.log(TAG, "Ad mark: "+util.json(submission));
	   res.json(submission);
	});
	
	
	
}

module.exports = {init: init};
