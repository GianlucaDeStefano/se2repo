const util = require('./utility.js');
const database = require('./database.js');


function init(app){
	const TAG = "REVIEW";
	const TABLE = "reviews";
	
	//Create review object and save it 
	app.post('/reviews', (req, res) => {
	   var owner_id = req.body["owner_id"];
	   var submission_id = req.body["submission_id"];
	   var task_id = req.body["task_id"];
	   var comment = req.body["comment"];
	   if (!util.isInteger(owner_id) || !util.isInteger(submission_id) || !util.isInteger(task_id) || util.isNull(comment)){
		   util.log(TAG, "Error: body is wrong format: " +util.json(req.body));
		   return res.status(400).send();
	   }
		var id=database.generateId(TABLE);
		var review = database.review(id, owner_id, submission_id, task_id, comment);
		
	   if(!database.insert(TABLE, review)){
		   util.log(TAG, "Error: failed to insert into database: " +util.json(review));
		   return res.status(500).send();
	   }
	   util.log(TAG, "Created: "+util.json(review));
	   return res.json(review);
	});

	//Get review object by id
	app.get('/reviews/:review_id', (req, res) => {
	   var review_id = parseInt(req.params["review_id"]);
	   if (!util.isInteger(review_id)){
		   util.log(TAG, "Error: id is not an integer: " +review_id);
		   return res.status(400).send();
	   }
	   var review = database.findBy(TABLE, "id", review_id);
	   if (util.isNull(review)){
		   util.log(TAG, "Error: failed to find in database with id: "+ review_id);
		   return res.status(404).send();
	   }
	   util.log(TAG, "Read: "+util.json(review));
	   res.json(review);
	});
	
	//Edit review by id
	app.patch('/reviews/:review_id', (req, res) => {
	   var review_id = parseInt(req.params["review_id"]);
	   var comment = req.body["comment"];
	   if (!util.isInteger(review_id) || !util.isString(comment)){
		   util.log(TAG, "Error: id is not an integer or comment not a string: " +review_id+", "+comment);
		   return res.status(400).send();
	   }
	   var review = database.findBy(TABLE, "id", review_id);
	   if (util.isNull(review)){
		   util.log(TAG, "Error: failed to find in database with id: "+ review_id);
		   return res.status(404).send();
	   }
	   review.comment = comment;
	   util.log(TAG, "Edited: "+util.json(review));
	   res.json(review);
	});


	//Delete review object by id
	app.delete('/reviews/:review_id', (req, res) => {
	   var review_id = parseInt(req.params["review_id"]);
	   if (!util.isInteger(review_id)){
		   util.log(TAG, "Error: id is not an integer: " +review_id);
		   return res.status(400).send();
	   }
	   if(!database.deleteBy(TABLE, "id", review_id)){
		   util.log(TAG, "Error: failed to delete from database with id: "+ review_id);
		   return res.status(404).send();
	   }
	   util.log(TAG, "Deleted: "+review_id);
	   return res.status(204).send();
	});
	
}

module.exports = {init: init};

