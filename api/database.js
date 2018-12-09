var DATABASE = [];
var TABLE_USER = table(
	user(1, "Ugo", "Rossi", "El_Cavaliere_Rosso", "ugo@email.com", "123456"),
	user(2, "Gianluca", "De Stefano", "g8i96", "giandes@gmail.com", "LookMomNoPsw"),
	user(3, "Francesco", "Tescari`", "garen_main_96", "tescarifra@email.it", "password"),
	user(4, "Marcello", "Unguentro`", "Unguento18", "unguentomarcello@gmail.it", "123456"),
	user(5, "Tommaso", "Passerino`", "rabrarabra", "appleuser@gmail.com", "1111"),
	user(6, "Lux", "Ottica`", "lux_main", "lux@demacia.it", "123653"),
	user(7, "Sandra", "Tescari`", "rango", "test@email.it", "ama123")
);

var TASKS_TABLE = table(
	task(1,1,"OPEN","2+2"),
    task(2,1,"OPEN","2+3"),
    task(3,1,"OPEN","What was the color of the white horse of Napoleon?"),
    task(4,1,"OPEN","What is the color of the white house?"),
    task(5,1,"OPEN","You have 3 apples, your friend Passerini steals one, calculate the mass of the sun"),
);

var EXAMS_TABLE = table(
	exam(1,2,[1,2,3]),
	exam(2,2,[2,4,5]),
	exam(3,1,[1,3,4,5])
);


var SUBMISSIONS_TABLE = table(
	submission(1,2,1,[4,5,'white'],10),
	submission(2,3,1,[5,4,'red'],0),
	submission(3,4,1,[4,4,'white'],6)
);

var REVIEWS_TABLE = table(
    review(1,1,1,1,"good answer!!!!"),
    review(2,1,2,1,"I don't think it is correct")
);

var GROUPS_TABLE = table(
	group(1,[1,2],[2,3,4,5]),
	group(2,[1,3],[6,7]),

);

addTable("users", TABLE_USER);
addTable("reviews",REVIEWS_TABLE);
addTable("submissions",SUBMISSIONS_TABLE);
addTable("tasks",TASKS_TABLE);
addTable("groups",GROUPS_TABLE);
addTable("exams",EXAMS_TABLE);

function addTable(table_name, table){
	DATABASE[table_name] = table;
}

function table(){
	var db = [];
	var i;
	for ( i = 0; i < arguments.length; i++){
		db.push(arguments[i]);
	}
	return {"nextId":i,"data":db};
}


function user(id, first, last, user, email, pass){
		return {
	  "user_id": id,
	  "first_name": first,
	  "last_name": last,
	  "username": user,
	  "email": email,
	  "password": pass
	}
}

function exam(id, ownerid,taskids){
		return {
	  "exam_id": id,
	  "owner_id": ownerid,
	  "questions": taskids
	}
}

function task(id,ownerid,taskType,taskQuestion){
	return {
	  "id": id,
	  "owner_id": ownerid,
	  "task_type": taskType,
	  "text": taskQuestion
	}
}

function review(id,ownerId,submissionId,taskId,reviewText){
	return {
	  "id": id,
	  "owner_id": ownerId,
	  "submission_id": submissionId,
		"task_id":taskId,
	  "comment": reviewText
	}
}

function group(id,examsIds,userIds){
	return {
	  "id": id,
	  "exam_ids": examsIds,
	  "user_ids": userIds
	}
}

function submission(id,userId,examId,answers,mark){
	return {
		"id": id,
		"user_id": userId,
		"exam_id": examId,
		"answers": answers,
		"mark":mark
	}
}


 // trova un elemento utilizzando come chiave <value> all'interno del campo <parameter> nella tabella <table_name>
function findBy(table_name, parameter, value){
	var table =  DATABASE[table_name]["data"];
	if (table == null){
		return null;
	}
	for (var i = 0; i < table.length; ++i){
		if (table[i][parameter] == value){
			return table[i];
		}
	}
	return null;
}

// trova degli elementi utilizzando come chiave <value> all'interno del campo <parameter> nella tabella <table_name>
function findListBy(table_name, parameter, value){
   var table =  DATABASE[table_name]["data"];
   if (table == null){
	   return null;
   }
   var res = [];
   for (var i = 0; i < table.length; ++i){
	   if (table[i][parameter] == value){
		   res.push(table[i]);
	   }
   }
   if(res.length == 0){
	   return null;
   }
   else{
	   return res;
   }
}

// inserisce l'oggetto passato all'interno della tabella indicata
function insert(table_name,obj){
	var table = DATABASE[table_name]["data"];
	if(table == null){
		return false
	}
	table.push(obj);
	return true;
}
// ritorna una tabella
function getList(table_name){
	return DATABASE[table_name]["data"];
}

// ottiene il prossimo id da utilizzare per un inserimento nella tabella indicata
function generateId(table_name){
    var id =DATABASE[table_name]["nextId"];
    DATABASE[table_name]["nextId"] = id+1;
	return id;
}

function deleteBy(table_name,parameter,value){
    var table =  DATABASE[table_name]["data"];
    if (table == null){
        return null;
    }
    for (var i = 0; i < table.length; ++i){
        if (table[i][parameter] == value){
        	table.splice(i,1);
            return true;
        }
    }
    return false;
}
module.exports = {addTable:addTable,table:table,user:user,exam:exam,task:task,review:review,group:group,submission:submission,findBy:findBy,findListBy:findListBy,insert:insert,getList:getList,generateId:generateId, deleteBy: deleteBy};
