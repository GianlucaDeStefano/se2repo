fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
test("Test POST /submission with right data", async () => {
	let reviewTest = {
	  "id": 10,
	  "user_id": 2,
	  "exam_id": 2,
	  "mark": 10
	};
	let response = await fetch(`${host}/${version}/submission`, {
		method: 'POST',
		body: JSON.stringify(reviewTest),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(200);
}
test("Test POST /submission with wrong data", async () => {
	let reviewTest = {
	  "id": 10.23,
	  "user_id": "notarealuserid",
	  "exam_id": {},
	  "mark": {"why": "not"}
	};
	let response = await fetch(`${host}/${version}/submission`, {
		method: 'POST',
		body: JSON.stringify(reviewTest),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
}
test("Test GET /submission/{id} with right data", async () => {
	let response = await fetch(`${host}/${version}/submission/122}`);
	expect(response.status).toEqual(200);
}
test("Test GET /submission/{id} with wrong data", async () => {
	let response = await fetch(`${host}/${version}/submission/asd}`);
	expect(response.status).toEqual(400);
}