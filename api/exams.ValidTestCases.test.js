const fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = `${host}/${version}`;

//****************************** VALID TEST CASES for /exams paths ******************************

/*
	- method: GET
	- path: /exams
	- valid: yes
*/
test("Test GET /exams", async () => {

	//sending request
    let response = await fetch(path + '/exams',{
        method: 'GET',
    });

    expect(response.status).toEqual(200);
});

/*
	- method: POST
	- path: /exams
	- valid: yes
*/
test("Test POST /exams with correct data", async () => {

	//defining the object to send
	let exam = {
		"owner_id": 30,
		"questions": [
			{
				"owner_id": 30,
				"task_type": 'MULTIPLE',
				"text": "The best programming language?",
				"answers": [
					{
						"text": "C/C++",
						"correct": true
					},
					{
						"text": "Python",
						"correct": false
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
				"text": "Write down a C server, you have 3 minutes.",
				"answers": []
			}
		]
	};

	//sending request
	let response = await fetch(path + '/exams', {
		method: 'POST',
		body: JSON.stringify(exam),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toEqual(201);

	//checking response object
	let obj = await response.json();
	expect(obj['exam_id']).toBeDefined();
});

/*
	- method: GET
	- path: /exams/{exam_id}
	- valid: yes
	- description: trying to get an existing exam
*/
test("Test GET /exams/{exam_id} with right exam_id", async () => {

	//exam_id of the exam to be retrieved
	let exam_id = 1;

	//sending request
	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'GET'
	});

	expect(response.status).toBe(200);

	//checking response object
	let obj = await response.json();
	expect(obj['exam_id']).toBeDefined();
});

/*
	- method: PATCH
	- path: /exams/{exam_id}
	- valid: yes
	- description: trying to modify an existing exam
*/
test("Test PATCH /exams/{exam_id} with right exam_id", async () => {

	//exam_id of the exam to be updated
	let exam_id = 1;

	//defining the exam update to send
	//changed right answer from C to Python
	let exam_update = {
		"owner_id": 30,
		"questions": [
			{
				"owner_id": 30,
				"task_type": 'MULTIPLE',
				"text": "The best programming language?"
			},
			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Why?"
			},
			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Write down a Python server, you have 3 minutes."
			}
		]
	};

	//sending request
	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'PATCH',
		body: JSON.stringify(exam_update),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toBe(200);

	//checking response object
	let obj = await response.json();
	expect(obj['exam_id']).toBeDefined();
});


/*
- method: GET
- path: /exams/{exam_id}/marks
- valid: yes
- description: trying to get the marks list of a single exam
*/
test("Test GET /exams/{exam_id}/marks with right exam_id", async () => {

	//exam_id of the exam to retrieve the marks list to
	let exam_id = 1;

	//sending request
	let response = await fetch(path + '/exams/' + exam_id + '/marks', {
		method: 'GET'
	});

	expect(response.status).toBe(200);
});

/*
	- method: DELETE
	- path: /exams/{exam_id}
	- valid: yes
	- description: trying to delete an existing exam
*/
test("Test DELETE /exams/{exam_id} with right exam_id", async () => {

	//exam_id of the exam to be deleted
	let exam_id = 1;

	//sending request
	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'DELETE',
	});

	expect(response.status).toBe(204);
});

/*
	- method: GET
	- path: /exams/{owner_id}/owner
	- valid: yes
	- description: trying to get the exams list of a single owner
*/
test("Test GET /exams/{owner_id}/owner with right owner_id", async () => {

	//owner_id of the exams' owner
	let owner_id = 1;

	//sending request
	let response = await fetch(path + '/exams/' + owner_id + '/owner', {
		method: 'GET'
	});

	expect(response.status).toBe(200);
});

//***********************************************************************************************
