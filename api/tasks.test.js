const fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = `${host}/${version}`;

//****************** tasks path tests ******************

/*
	- method: GET
	- path: /tasks
	- valid: yes
*/
test("Test GET /tasks", async () => {

    let response = await fetch(path + '/tasks',{
        method: 'GET',
    });
    expect(response.status).toEqual(200);
	//should also test an empty tasks list
});

/*
	- method: POST
	- path: /tasks
	- valid: yes
*/
test("Test POST /tasks with correct data", async () => {

	let task = {
		"owner_id": 30,
		"text": [

			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Do x y z, use javascript",
				"answers": []
			},
			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Write down a javascript server.",
				"answers": []
			}
		]
	};

	let response = await fetch(path + '/tasks', {
		method: 'POST',
		body: JSON.stringify(task),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toEqual(201);

	let obj = await response.json();
	expect(obj['id']).toBeDefined();
});

/*
	- method: POST
	- path: /tasks
	- valid: no
	- description: trying to create an empty task
*/
test("Test POST /tasks with no tasks", async () => {

	let task = {
		"owner_id": 10,
		"text": []
	};

	let response = await fetch(path + '/tasks', {
		method: 'POST',
		body: JSON.stringify(task),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toEqual(400);
});

/*
	- method: GET
	- path: /tasks/{id}
	- valid: yes
	- description: trying to get an existing task
*/
test("Test GET /tasks/{id} with right id", async () => {

	let id = 1;

	let response = await fetch(path + '/tasks/' + id, {
		method: 'GET'
	});

	expect(response.status).toBe(200);

	let obj = await response.json();
	expect(obj['id']).toBeDefined();
});

/*
	- method: GET
	- path: /tasks/{id}
	- valid: no
	- description: trying to get an unexisting task
*/
test("Test GET /tasks/{id} with wrong id", async () => {

	let id = 9999;

	let response = await fetch(path + '/tasks/' + id, {
		method: 'GET'
	});

	expect(response.status).toBe(404);
});

/*
	- method: PATCH
	- path: /tasks/{id}
	- valid: yes
	- description: trying to modify an existing task
*/
test("Test PATCH /tasks/{id} with right id", async () => {

	let id = 1;
	let task_update = {
		"owner_id": 30,
		"text": [

			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Do x y z, use javascript",
				"answers": []
			},
			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Write down a javascript server.",
				"answers": []
			}
		]
	}

	let response = await fetch(path + '/tasks/' + id, {

		method: 'PATCH',
		body: JSON.stringify(task_update),
		headers: {
			'Content-type': 'application/json'
		}
	});

	expect(response.status).toBe(200);

	let obj = await response.json();
	expect(obj['id']).toBeDefined();
});

/*
	- method: PATCH
	- path: /tasks/{id}
	- valid: no
	- description: trying to modify an unexisting task
*/
test("Test GET /tasks/{id} with right id", async () => {

	let id = 9999;
	//changed right answer from C to Python
	let task_update = {
		"owner_id": 30,
		"text": [

			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Why?",
				"answers": []
			},
			{
				"owner_id": 30,
				"task_type": 'OPEN',
				"text": "Write down a javascript server.",
				"answers": []
			}
		]
	}

	let response = await fetch(path + '/tasks/' + id, {

		method: 'PATCH',
		body: JSON.stringify(task_update),
		headers: {
			'Content-type': 'application/json'
		}
	});

	expect(response.status).toBe(404);
});


/*
	- method: GET
	- path: /tasks/{id}/marks
	- valid: yes
	- description: trying to get the annsware of the test 
*/
test("Test GET /tasks/{id}/answer with right id", async () => {

	let id = 1;

	let response = await fetch(path + '/tasks/' + id + '/answer', {
		method: 'GET'
	});

	expect(response.status).toBe(200);

});

/*
	- method: GET
	- path: /tasks/{id}/answer
	- valid: no
	- description: trying to get the annsware of the test 
*/
test("Test GET /tasks/{id}/answer with wrong id", async () => {

	let id = 9999;

	let response = await fetch(path + '/tasks/' + id + '/answer', {
		method: 'GET'
	});

	expect(response.status).toBe(404);

});
/*
	- method: DELETE
	- path: /tasks/{id}
	- valid: yes
	- description: trying to delete an existing task
*/
test("Test DELETE /tasks/{id} with right id", async () => {

	let id = 1;

	let response = await fetch(path + '/tasks/' + id, {
		method: 'DELETE',
	});

	expect(response.status).toBe(204);
});

/*
	- method: DELETE
	- path: /tasks/{id}
	- valid: no
	- description: trying to delete an unexisting task
*/
test("Test DELETE /tasks/{id} with wrong id", async () => {

	let id = 9999;

	let response = await fetch(path + '/tasks/' + id, {
		method: 'DELETE',
	});

	expect(response.status).toBe(404);
});


