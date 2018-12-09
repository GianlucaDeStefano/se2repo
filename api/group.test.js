const fetch = require('node-fetch');
const util = require('./utility.js');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = `${host}/${version}`;
var group = null;

test("Test POST /groups with right data", async () => {
	let groupData = {
		"owner_id" : 1,
		"exam_ids" : [1,2],
		"user_ids" : [2,3,4,5]	
	}
	let response = await fetch(`${path}/groups`, {
		method: 'POST',
		body: util.json(groupData),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(200);
	group = await response.json();
	expect(group["id"]).toBeDefined();
});
test("Test POST /groups with wrong data", async () => {
	let groupData = {
		"owner_id" : 1,
		"exam_ids" : 2,
		"user_ids" : "wow"	
	}
	let response = await fetch(`${path}/groups`, {
		method: 'POST',
		body: util.json(groupData),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test POST /groups with wrong ids", async () => {
	let groupData = {
		"owner_id" : 1,
		"exam_ids" : [true,"sda"],
		"user_ids" : [0,{}]
	}
	let response = await fetch(`${path}/groups`, {
		method: 'POST',
		body: util.json(groupData),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test GET /groups/{id} with right data", async () => {
	expect(group["id"]).toBeDefined();
	let response = await fetch(`${path}/groups/`+group["id"]);
	expect(response.status).toEqual(200);
	let getGroup = await response.json();
	expect(getGroup["id"]).toEqual(group["id"]);
});

test("Test GET /groups/{id} with wrong data", async () => {
	let response = await fetch(`${path}/groups/asd`);
	expect(response.status).toEqual(400);
});

test("Test GET /groups/{id} with wrong data id", async () => {
	let response = await fetch(`${path}/groups/643634`);
	expect(response.status).toEqual(404);
});



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
