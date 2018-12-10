const fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = `${host}/${version}`;

//****************************** NOT VALID TEST CASES for /exams paths ******************************

/*
	- method: POST
	- path: /exams
	- valid: no
	- description: trying to create an empty exam
*/
test("Test POST /exams with no tasks", async () => {

	//defining object to send
	let exam = {
		"owner_id": 10,
		"questions": []
	};

	//sending request
	let response = await fetch(path + '/exams', {
		method: 'POST',
		body: JSON.stringify(exam),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toEqual(400);
});

/*
	- method: GET
	- path: /exams/{exam_id}
	- valid: no
	- description: trying to get an unexisting exam
*/
test("Test GET /exams/{exam_id} with wrong exam_id", async () => {

	//exam_id of the exam to be retrieved
	let exam_id = 9999;

	//sending request
	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'GET'
	});

	expect(response.status).toBe(404);
});

/*
	- method: GET
	- path: /exams/{exam_id}
	- valid: no
	- description: trying to get an exam specifing a bad exam_id
*/
test("Test GET /exams/{exam_id} with bad exam_id", async () => {

	//exam_id of the exam to be retrieved
	let exam_id = 'hci';

	//sending request
	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'GET'
	});

	expect(response.status).toBe(400);
});

/*
	- method: PATCH
	- path: /exams/{exam_id}
	- valid: no
	- description: trying to modify an unexisting exam
*/
test("Test PATCH /exams/{exam_id} with wrong exam_id", async () => {

	//exam_id of the exam to be updated
	let exam_id = 9999;

	//defining the exam update to send
	//changed right answer from C to Python
	let exam_update = {
		"owner_id": 30,
		"questions": [
			{
				"owner_id": 30,
				"task_type": 'MULTIPLE',
				"text": "The best programming language?",
				"answers": [
					{
						"text": "C/C++",
						"correct": false
					},
					{
						"text": "Python",
						"correct": true
					},
					{
						"text": "Java",
						"correct": false
					}
				]
			},
			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Why?",
				"answers": []
			},
			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Write down a Python server, you have 3 minutes.",
				"answers": []
			}
		]
	}

	//sending request
	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'PATCH',
		body: JSON.stringify(exam_update),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toBe(404);
});

/*
	- method: PATCH
	- path: /exams/{exam_id}
	- valid: no
	- description: trying to modify an exam specifing a bad exam_id
*/
test("Test PATCH /exams/{exam_id} with bad exam_id", async () => {

	//exam_id of the exam to be updated
	let exam_id = 'hci';

	//defining the exam update to send
	//changed right answer from C to Python
	let exam_update = {
		"owner_id": 30,
		"questions": [
			{
				"owner_id": 30,
				"task_type": 'MULTIPLE',
				"text": "The best programming language?",
				"answers": [
					{
						"text": "C/C++",
						"correct": false
					},
					{
						"text": "Python",
						"correct": true
					},
					{
						"text": "Java",
						"correct": false
					}
				]
			},
			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Why?",
				"answers": []
			},
			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Write down a Python server, you have 3 minutes.",
				"answers": []
			}
		]
	}

	//sending request
	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'PATCH',
		body: JSON.stringify(exam_update),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toBe(400);
});

/*
- method: GET
- path: /exams/{exam_id}/marks
- valid: no
- description: trying to get the marks list of an unexisting exam
*/
test("Test GET /exams/{exam_id}/marks with wrong exam_id", async () => {

	//exam_id of the exam to retrieve the marks list
	let exam_id = 9999;

	//sending request
	let response = await fetch(path + '/exams/' + exam_id + '/marks', {
		method: 'GET'
	});

	expect(response.status).toBe(404);
});

/*
- method: GET
- path: /exams/{exam_id}/marks
- valid: no
- description: trying to get the marks list of an exam by specifing a bad exam_id
*/
test("Test GET /exams/{exam_id}/marks with bad exam_id", async () => {

	//exam_id of the exam to retrieve the marks list
	let exam_id = 'hci';

	//sending request
	let response = await fetch(path + '/exams/' + exam_id + '/marks', {
		method: 'GET'
	});

	expect(response.status).toBe(400);
});

/*
	- method: DELETE
	- path: /exams/{exam_id}
	- valid: no
	- description: trying to delete an unexisting exam
*/
test("Test DELETE /exams/{exam_id} with wrong exam_id", async () => {

	//exam_id of the exam to be deleted
	let exam_id = 9999;

	//sending request
	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'DELETE',
	});

	expect(response.status).toBe(404);
});

/*
	- method: DELETE
	- path: /exams/{exam_id}
	- valid: no
	- description: trying to delete an exam by specifing a bad exam_id
*/
test("Test DELETE /exams/{exam_id} with bad exam_id", async () => {

	//exam_id of the exam to be deleted
	let exam_id = 'hci';

	//sending request
	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'DELETE',
	});

	expect(response.status).toBe(400);
});

/*
	- method: GET
	- path: /exams/{owner_id}/owner
	- valid: no
	- description: trying to get the exams list of a single unexisting owner
*/
test("Test GET /exams/{owner_id}/owner with wrong owner_id", async () => {

	//owner_id of the exams' owner
	let owner_id = 9999;

	//sending request
	let response = await fetch(path + '/exams/' + owner_id + '/owner', {
		method: 'GET'
	});

	expect(response.status).toBe(404);
});

/*
	- method: GET
	- path: /exams/{owner_id}/owner
	- valid: no
	- description: trying to get the exams list of an owner specifing a bad owner_id
*/
test("Test GET /exams/{owner_id}/owner with bad owner_id", async () => {

	//owner_id of the exams' owner
	let owner_id = 'fausto';

	//sending request
	let response = await fetch(path + '/exams/' + owner_id + '/owner', {
		method: 'GET'
	});

	expect(response.status).toBe(400);
});
//******************************************************
