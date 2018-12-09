const fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = `${host}/${version}`;
var review = null;
const test_comment = "not a common comment really";
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
	review = await response.json();
	expect(review["id"]).toBeDefined();
	
});
test("Test POST /reviews with wrong data type", async () => {
	let reviewTest = {
	  "owner_id": 10,
	  "task_id": "lol",
	  "submission_id": "notaninteger",
	  "comment": "kmiamicasc0pa"
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
//PATCH 
test("Test PATCH /reviews/{id} with right data", async () => {
	expect(review["id"]).toBeDefined();
	let response = await fetch(`${path}/reviews/`+review["id"],{
		method: 'PATCH',
		body: JSON.stringify({comment: test_comment}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(200);
});
test("Test PATCH /reviews/{id} with wrong data", async () => {
	let response = await fetch(`${path}/reviews/asd`,{
		method: 'PATCH',
		body: JSON.stringify({comment: test_comment}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test PATCH /reviews/{id} with wrong data id", async () => {
	let response = await fetch(`${path}/reviews/90032`,{
		method: 'PATCH',
		body: JSON.stringify({comment: test_comment}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(404);
});
test("Test PATCH /reviews/{id} with wrong comment data", async () => {
	expect(review["id"]).toBeDefined();
	let response = await fetch(`${path}/reviews/`+review["id"],{
		method: 'PATCH',
		body: JSON.stringify({comment: true}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});


test("Test GET /reviews/{id} with right data", async () => {
	expect(review["id"]).toBeDefined();
	let response = await fetch(`${path}/reviews/`+review["id"]);
	expect(response.status).toEqual(200);
	let obj = await response.json();
	expect(obj["id"]).toBeDefined();
	expect(obj["comment"]).toEqual(test_comment);
});
test("Test GET /reviews/{id} with wrong data", async () => {
	let response = await fetch(`${path}/reviews/asd`);
	expect(response.status).toEqual(400);
});
test("Test GET /reviews/{id} with wrong data id", async () => {
	let response = await fetch(`${path}/reviews/1000234`);
	expect(response.status).toEqual(404);
});


test("Test DELETE /reviews/{id} with right data", async () => {
	expect(review["id"]).toBeDefined();
	let response = await fetch(`${path}/reviews/`+review["id"],{
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
test("Test DELETE /reviews/{id} with wrong data id", async () => {
	expect(review["id"]).toBeDefined();
	let response = await fetch(`${path}/reviews/234332`,{
		method: 'DELETE',
	});
	expect(response.status).toEqual(404);
});
