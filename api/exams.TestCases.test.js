const fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = `${host}/${version}`;

//****************************** TEST CASES for /exams paths ******************************

/*
	- method: GET
	- path: /exams/
	- valid: yes
	- description: trying to get the exams list when empty
*/

test("Test GET /exams when exams list is empty", async () => {

	//first we empty the exam list by deleting every exam
	let exam = await fetch(path + '/exams', {
		method: 'GET'
	});

	expect(exam.status).toBe(200);

	//we fire requests to delete all exams
	//we catch every exam_id from the retrieved exams list
	//then send a DELETE request to every exam_id expecting positive results
	for(let i = 0; i < exam.length; ++i){
		//catching the exam_id
		let exam_id = exam[i]['exam_id'];

		//firing request
		let deleted = await fetch(path + '/exams/' + exam_id, {
			method: 'DELETE'
		})

		expect(deleted.status).toBe(204);
	}

	//now we fire the GET request expecting an empty list
	let response = await fetch(path + '/exams', {
		method: 'GET'
	});

	expect(response.status).toBe(204);
});

//*****************************************************************************************
