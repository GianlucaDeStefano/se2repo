fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
test("Test POST /reviews with right data", async () => {
	let reviewTest = {
	  "id": 3,
	  "owner_id": 10,
	  "task_id": 130,
	  "submission_id": 200,
	  "correct": false,
	  "comment": "Ut ex"
	};
	let response = await fetch(`${host}/${version}/reviews`, {
		method: 'POST',
		body: JSON.stringify(reviewTest),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(200);
}
test("Test POST /reviews with wrong data type", async () => {
	let reviewTest = {
	  "id": "notaninteger",
	  "owner_id": 10,
	  "task_id": 130,
	  "submission_id": 200,
	  "correct": {},
	  "comment": "Ut ex"
	};
	let response = await fetch(`${host}/${version}/reviews`, {
		method: 'POST',
		body: JSON.stringify(reviewTest),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
}
test("Test GET /reviews/{id} with right data", async () => {
	let response = await fetch(`${host}/${version}/reviews/23`);
	expect(response.status).toEqual(200);
	let obj = JSON.parse(response.text());
	expect(obj).toIncludeKey('id');
}
test("Test GET /reviews/{id} with wrong data", async () => {
	let response = await fetch(`${host}/${version}/reviews/asd`);
	expect(response.status).toEqual(400);
}
test("Test PUT /reviews/{id} with right data", async () => {
	let response = await fetch(`${host}/${version}/reviews/23`,{
		method: 'PUT',
	});
	expect(response.status).toEqual(200);
	let obj = JSON.parse(response.text());
	expect(obj).toIncludeKey('id');
}
test("Test PUT /reviews/{id} with wrong data", async () => {
	let response = await fetch(`${host}/${version}/reviews/asd`,{
		method: 'PUT',
	});
	expect(response.status).toEqual(400);
}
test("Test DELETE /reviews/{id} with right data", async () => {
	let response = await fetch(`${host}/${version}/reviews/23`,{
		method: 'DELETE',
	});
	expect(response.status).toEqual(200);
	let obj = JSON.parse(response.text());
	expect(obj).toIncludeKey('id');
}
test("Test DELETE /reviews/{id} with wrong data", async () => {
	let response = await fetch(`${host}/${version}/reviews/asd`,{
		method: 'DELETE',
	});
	expect(response.status).toEqual(400);
}
