const util = require('./utility.js');
const database = require('./database.js');


function init(app){
	const TAG = "GROUP";
	const TABLE = "groups";
	
	//Create group with exams, owner and users
	app.post('/groups/', (req, res) => {
		var owner_id = req.body["owner_id"];
		var exam_ids = req.body["exam_ids"];
		var user_ids = req.body["user_ids"];
		if (!util.isInteger(owner_id) || !util.isArray(exam_ids) || !util.isArray(user_ids)){
			util.log(TAG, "Error: wrong post data: "+util.json(req.body));
			return res.status(400).send();
		}
		for (var i = 0; i<exam_ids.length; ++i){
			if (!util.isInteger(exam_ids[i])){
				util.log(TAG, "Error: exam_id not an integer: "+exam_ids[i]);
			return res.status(400).send();
			}
		}
		for (var i = 0; i<user_ids.length; ++i){
			if (!util.isInteger(user_ids[i])){
				util.log(TAG, "Error: user_id not an integer: "+user_ids[i]);
				return res.status(400).send();
			}
		}
		var id = database.generateId(TABLE);
		var group = database.group(id, owner_id, exam_ids, user_ids);
		if (!database.insert(TABLE, group)){
			util.log(TAG, "Error: cannot insert group into database: "+util.json(group));
			return res.status(500).send();
		}
		util.log(TAG,"Created with id: "+id);
		return res.json(group);
	});
	
	//Get group by group_id
	app.get('/groups/:group_id', (req, res) => {
	   var group_id = parseInt(req.params["group_id"]);
	   if (!util.isInteger(group_id)){
		   util.log(TAG, "Error: group_id is not an integer: "+group_id);
		   return res.status(400).send();
	   }
	   var group = database.findBy(TABLE, "id", group_id);
	   if (util.isNull(group)){
		   util.log(TAG, "Error: failed to find group with id "+group_id+" in database");
		   return res.status(404).send();
	   }
	   util.log("Read: "+util.json(group));
	   return res.json(group); 
	});
	

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