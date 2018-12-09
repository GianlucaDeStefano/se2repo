const util = require('./utility.js');
const database = require('./database.js');
 
const TAG = "USER";

function init(app){
	//print users list
	app.get('/users', (req, res) => {
		var users= database.getList("users");
		return res.json(users);
	})

	// get user by id
	app.get('/users/:userid', (req, res) => {
		var userId = parseInt(req.params["userid"]);
		if(!util.isInteger(userId)){
			return res.status(400).send();
		}
		var user = database.findBy("users", "user_id", userId);
		util.log(TAG,"Read: "+ util.json(user));
		if (util.isNull(user)){
			console.log('not found');
		   return res.status(404).send();
	    }
		
		util.log(TAG,"Read: "+ util.json(user));
		return res.json(user);
	})

	// add a new user to the db
	app.post("/users/", (req, res) => {
		var first = req.body["first_name"];
		var second = req.body["last_name"];
		var user = req.body["username"];
		var email = req.body["email"];
		var psw = req.body["password"];
		if (first == null || second == null || user == null || email == null || psw == null){
			return res.status(400).send();
		}
		var id=database.generateId("users");
		if(!database.insert("users", database.user(id, first, second,  user, email,psw))){
			return res.status(500).send();
		}
		util.log(TAG,"Created : "+ util.json(user));
		return res.status(200).send();
	});

	// update users by id
	app.patch("/users/:users_Id", (req, res) => {
		var userId = parseInt(req.params["users_Id"]);
		var first = req.body["first_name"];
		var second = req.body["last_name"];
		var user = req.body["username"];
		var email = req.body["email"];
		var psw = req.body["password"];
		if (first == null || second == null || user == null || email == null || psw == null){
			return res.status(400).send();
		}
		var id=database.generateId("users");
		var user = database.findBy("users", "id", id);
		if (util.isNull(user)){
			return res.status(404).send();
		}
		user = database.user(id, first, second,  user, email,psw);
		util.log(TAG,"Edited : "+ util.json(user));
		return res.status(200).send();
	});

	//Delete user object by id
	app.delete('/users/:users_Id', (req, res) => {
		var user_Id = parseInt(req.params["users_Id"]);
		if (!util.isInteger(user_Id)){
			return res.status(400).send();
		}
		if(!database.deleteBy("users", "id", user_Id)){
			return res.status(400).send();
		}
		util.log(TAG,"Deleted : "+ util.json(user));
		return res.status(200).send();
	})
}


module.exports = {init: init};