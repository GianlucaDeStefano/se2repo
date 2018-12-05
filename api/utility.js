function isString(x){
	if (x == null){
		return false;
	}
	return x.constructor === String;
}

function isNull(x){
	return x == null;
}
function isInteger(x){
	return Number.isInteger(x);
}
function isArray(x){
	return Array.isArray(x);
}
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

module.exports = {isString:isString, isNull:isNull, isInteger:isInteger, isArray:isArray, arrayDelete:arrayDelete};