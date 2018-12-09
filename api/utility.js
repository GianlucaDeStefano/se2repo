//return true if arg is a string
function isString(x){
	if (x == null){
		return false;
	}
	return x.constructor === String;
}
//return true if arg is null
function isNull(x){
	return x == null;
}
//return true if arg is an integer
function isInteger(x){
	return Number.isInteger(x);
}
//return true if arg is an array
function isArray(x){
	return Array.isArray(x);
}
//return true if arg is a boolean 
function isBoolean(x){
	return (typeof x == typeof true);
}

//delete element (second arg) from array (first arg)
function arrayDelete(array, el){
	if (!isArray(array) || isNull(el)){
		return false;
	}
	var index = array.indexOf(el);
	if (index == -1){
		return false;
	}
	array.splice(index,1);
	return true;
}

function getTime(){
	return (new Date()).toJSON().slice(11, 19).replace(/[-T]/g, ':')
}
//logs to stdout with time, tag (first arg) and actual log (second arg)
function log(tag, value){
	console.log("[%s][%s] %s", getTime(), tag, value);
}
//return json string of object
function json(obj){
	return JSON.stringify(obj);
}
module.exports = {isString:isString, isNull:isNull, isInteger:isInteger, isArray:isArray, arrayDelete:arrayDelete, log: log, json : json, isBoolean: isBoolean};