const fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = host; //= ${host}/${version}
test("Test POST /reviews with right data", async () => {
	let reviewTest = {
	  "owner_id": 1,
	  "task_id": 1,
	  "submission_id": 1,
	  "comment": "Nice try bro"
	};
	let response = await fetch(`${path}/reviews`, {
		method: 'POST',
		body: JSON.stringify(reviewTest),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(200);
});
test("Test POST /reviews with wrong data type", async () => {
	let reviewTest = {
	  "owner_id": 10,
	  "task_id": "lol",
	  "submission_id": "notaninteger",
	  "comment": "Ut ex"
	};
	let response = await fetch(`${path}/reviews`, {
		method: 'POST',
		body: JSON.stringify(reviewTest),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test GET /reviews/{id} with right data", async () => {
	let response = await fetch(`${path}/reviews/2`);
	expect(response.status).toEqual(200);
	let obj = response.json();
	expect(obj["id"]).toBeUndefined();
});
test("Test GET /reviews/{id} with wrong data", async () => {
	let response = await fetch(`${path}/reviews/asd`);
	expect(response.status).toEqual(400);
});

//PUT Request to redefine
/*test("Test PUT /reviews/{id} with right data", async () => {
	let response = await fetch(`${path}/reviews/23`,{
		method: 'PUT',
	});
	expect(response.status).toEqual(200);
	let obj = JSON.parse(response.text());
	expect(obj).toIncludeKey('id');
});
test("Test PUT /reviews/{id} with wrong data", async () => {
	let response = await fetch(`${path}/reviews/asd`,{
		method: 'PUT',
	});
	expect(response.status).toEqual(400);
});*/
test("Test DELETE /reviews/{id} with right data", async () => {
	let response = await fetch(`${path}/reviews/1`,{
		method: 'DELETE',
	});
	expect(response.status).toEqual(204);
});
test("Test DELETE /reviews/{id} with wrong data", async () => {
	let response = await fetch(`${path}/reviews/asd`,{
		method: 'DELETE',
	});
	expect(response.status).toEqual(400);
});
