const fetch = require('node-fetch');
const db = require('./database.js');
const util = require('./utility.js');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = `${host}/${version}`;
var group = db.group(1,[1,2],[2,3,4,5]); //=null  //Questo dovrebbe essere l'oggetto group usato per il test, quello creato con il post e quindi andrebbe assegnato nel test per il post, da mettere come primo test;

test("Test PUT /groups/{id}/exam with right data", async () => {
	expect(group["id"]).toBeDefined();
	let response = await fetch(`${path}/groups/`+group["id"]+`/exam`, {
		method: 'PUT',
		body: util.json({"exam_id" : 56}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(200);
});
test("Test PUT /groups/{id}/exam with wrong data", async () => {
	let response = await fetch(`${path}/groups/notanid/exam`, {
		method: 'PUT',
		body: util.json({"exam_id" : 56}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test PUT /groups/{id}/exam with wrong exam data", async () => {
	let response = await fetch(`${path}/groups/`+group["id"]+`/exam`, {
		method: 'PUT',
		body: util.json({"exam_id" : "wow"}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test DELETE /groups/{id}/exam with right data", async () => {
	expect(group["id"]).toBeDefined();
	let response = await fetch(`${path}/groups/`+group["id"]+`/exam`, {
		method: 'DELETE',
		body: util.json({"exam_id" : 56}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(204);
});
test("Test DELETE /groups/{id}/exam with wrong data", async () => {
	expect(group["id"]).toBeDefined();
	let response = await fetch(`${path}/groups/looool/exam`, {
		method: 'DELETE',
		body: util.json({"exam_id" : -56}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test DELETE /groups/{id}/exam with wrong body data", async () => {
	expect(group["id"]).toBeDefined();
	let response = await fetch(`${path}/groups/`+group["id"]+`/exam`, {
		method: 'DELETE',
		body: util.json({"exam_id" : "notanid"}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test DELETE /groups/{id}/exam with already deleted exam", async () => {
	expect(group["id"]).toBeDefined();
	let response = await fetch(`${path}/groups/`+group["id"]+`/exam`, {
		method: 'DELETE',
		body: util.json({"exam_id" : 56}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
