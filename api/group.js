const util = require('./utility.js');
const database = require('./database.js');


function init(app){
	const TAG = "GROUP";
	const TABLE = "groups";

	//Add exam_id to group
	app.put('/groups/:group_id/exam', (req, res) => {
	   var group_id = parseInt(req.params["group_id"]);
	   var exam_id  = req.body["exam_id"];
	   if (!util.isInteger(group_id) || !util.isInteger(exam_id)){
		   util.log(TAG, "Error: group_id or exam_id is not an integer: "+group_id+", "+exam_id);
		   return res.status(400).send();
	   }
	   var group = database.findBy(TABLE, "id", group_id);
	   if (util.isNull(group)){
		   util.log(TAG, "Error: failed to find group with id "+group_id+" in database");
		   return res.status(404).send();
	   }
	   group["exam_ids"].push(exam_id);
	   util.log(TAG, "Added exam " +exam_id+" to group " +group_id);
	   return res.status(200).send();
	});
	
	
	//Remove exam_id from group
	app.delete('/groups/:group_id/exam', (req, res) => {
	   var group_id = parseInt(req.params["group_id"]);
	   var exam_id  = req.body["exam_id"];
	   if (!util.isInteger(group_id) || !util.isInteger(exam_id)){
		   util.log(TAG, "Error: group_id or exam_id is not an integer: "+group_id+", "+exam_id);
		   return res.status(400).send();
	   }
	   var group = database.findBy(TABLE, "id", group_id);
	   if (util.isNull(group)){
		   util.log(TAG, "Error: failed to find group with id "+group_id+" in database");
		   return res.status(404).send();
	   }
	   if (!util.arrayDelete(group["exam_ids"], exam_id)){
		   util.log(TAG, "Error: failed to delete exam_id "+exam_id+" from group with exams: "+util.json(group["exam_ids"]));
		   return res.status(400).send();
	   }
	   util.log(TAG, "Removed exam " +exam_id+" from group " +group_id);
	   return res.status(204).send();
	});
	
	
	
}

module.exports = {init: init};