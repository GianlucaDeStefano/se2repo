var fetch = require('node-fetch');

var host = process.env.BASEURL || 'http://localhost:3000';
var version = 'V1';
var path = host;

//****************** exams path tests ******************

/*
	- method: GET
	- path: /exams
	- valid: yes
*/
test("Test GET /exams", async () => {

    let response = await fetch(path + '/exams',{
        method: 'GET',
    });
    expect(response.status).toEqual(200);
	//should also test an empty exams list
});

/*
	- method: POST
	- path: /exams
	- valid: yes
*/
test("Test POST /exams with correct data", async () => {

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

	let response = await fetch(path + '/exams', {
		method: 'POST',
		body: JSON.stringify(exam),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toEqual(201);

	let obj = await response.json();
	expect(obj['exam_id']).toBeDefined();
});

/*
	- method: POST
	- path: /exams
	- valid: no
	- description: trying to create an empty exam
*/
test("Test POST /exams with no tasks", async () => {

	let exam = {
		"owner_id": 10,
		"questions": []
	};

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
	- valid: yes
	- description: trying to get an existing exam
*/
test("Test GET /exams/{exam_id} with right exam_id", async () => {

	let exam_id = 1;

	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'GET'
	});

	expect(response.status).toBe(200);

	let obj = await response.json();
	expect(obj['exam_id']).toBeDefined();
});

/*
	- method: GET
	- path: /exams/{exam_id}
	- valid: no
	- description: trying to get an unexisting exam
*/
test("Test GET /exams/{exam_id} with wrong exam_id", async () => {

	let exam_id = 9999;

	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'GET'
	});

	expect(response.status).toBe(404);
});

/*
	- method: PATCH
	- path: /exams/{exam_id}
	- valid: yes
	- description: trying to modify an existing exam
*/
test("Test PATCH /exams/{exam_id} with right exam_id", async () => {

	let exam_id = 1;
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

	let response = await fetch(path + '/exams/' + exam_id, {

		method: 'PATCH',
		body: JSON.stringify(exam_update),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toBe(200);

	let obj = await response.json();
	expect(obj['exam_id']).toBeDefined();
});

/*
	- method: PATCH
	- path: /exams/{exam_id}
	- valid: no
	- description: trying to modify an unexisting exam
*/
test("Test PATCH /exams/{exam_id} with wrong exam_id", async () => {

	let exam_id = 9999;
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
- method: GET
- path: /exams/{exam_id}/marks
- valid: yes
- description: trying to get the marks list of a single exam
*/
test("Test GET /exams/{exam_id}/marks with right exam_id", async () => {

	let exam_id = 1;

	let response = await fetch(path + '/exams/' + exam_id + '/marks', {
		method: 'GET'
	});

	expect(response.status).toBe(200);

});

/*
- method: GET
- path: /exams/{exam_id}/marks
- valid: no
- description: trying to get the marks list of a single unexisting exam
*/
test("Test GET /exams/{exam_id}/marks with wrong exam_id", async () => {

	let exam_id = 9999;

	let response = await fetch(path + '/exams/' + exam_id + '/marks', {
		method: 'GET'
	});

	expect(response.status).toBe(404);

});
/*
	- method: DELETE
	- path: /exams/{exam_id}
	- valid: yes
	- description: trying to delete an existing exam
*/
test("Test DELETE /exams/{exam_id} with right exam_id", async () => {

	let exam_id = 1;

	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'DELETE',
	});

	expect(response.status).toBe(204);
});

/*
	- method: DELETE
	- path: /exams/{exam_id}
	- valid: no
	- description: trying to delete an unexisting exam
*/
test("Test DELETE /exams/{exam_id} with wrong exam_id", async () => {

	let exam_id = 9999;

	let response = await fetch(path + '/exams/' + exam_id, {
		method: 'DELETE',
	});

	expect(response.status).toBe(404);
});


/*
	- method: GET
	- path: /exams/{owner_id}/owner
	- valid: yes
	- description: trying to get the exams list of a single owner
*/
test("Test GET /exams/{owner_id}/owner with right owner_id", async () => {

	let owner_id = 1;

	let response = await fetch(path + '/exams/' + owner_id + '/owner', {
		method: 'GET'
	});

	expect(response.status).toBe(200);
	//should also test when no exams present
});

/*
	- method: GET
	- path: /exams/{owner_id}/owner
	- valid: no
	- description: trying to get the exams list of a single unexisting owner
*/
test("Test GET /exams/{owner_id}/owner with wrong owner_id", async () => {

	let owner_id = 9999;

	let response = await fetch(path + '/exams/' + owner_id + '/owner', {
		method: 'GET'
	});

	expect(response.status).toBe(404);
	//should also test when no exams present
});
//******************************************************
