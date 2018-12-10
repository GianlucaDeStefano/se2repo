fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = host+"/"+version;
var submission = null;
test("Test POST /submissions with right data", async () => {
	let subTest = {
	  "user_id": 2,
	  "exam_id": 2,
	  "mark": 10,
	  "answers": [{"text": "vero", "correct": true},{"text": "La Gioconda", "correct": false},{"text": "Questa è una risponsa ad una domanda aperta", "correct": true}]
	};
	let response = await fetch(`${path}/submissions`, {
		method: 'POST',
		body: JSON.stringify(subTest),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(200);
	submission = await response.json();
	expect(submission["id"]).toBeDefined();
});
test("Test POST /submissions with wrong data", async () => {
	let subTest = {
	  "id": 10.23,
	  "user_id": "notarealuserid",
	  "exam_id": {},
	  "mark": {"why": "not"}
	};
	let response = await fetch(`${path}/submissions`, {
		method: 'POST',
		body: JSON.stringify(subTest),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test POST /submissions with wrong anwser data", async () => {
	let subTest = {
	  "user_id": 2,
	  "exam_id": 2,
	  "mark": 10,
	  "answers": [{"text": 32, "correct": true},{"text": "La Gioconda", "correct": "false"},{"text": "Questa è una risponsa ad una domanda aperta", "correct": "notabool"}]
	};
	let response = await fetch(`${path}/submissions`, {
		method: 'POST',
		body: JSON.stringify(subTest),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);
});
test("Test GET /submissions/{id} with right data", async () => {
	expect(submission["id"]).toBeDefined();
	let response = await fetch(`${path}/submissions/`+submission["id"]);
	expect(response.status).toEqual(200);
	var result = await response.json();
	expect(result["id"]).toEqual(submission["id"]);
});
test("Test GET /submissions/{id} with wrong data", async () => {
	let response = await fetch(`${path}/submissions/asd}`);
	expect(response.status).toEqual(400);
});


test("give/update mark of a submission /submissions/{id}/mark with right data", async () => {
	expect(submission["id"]).toBeDefined();
	let mark ={"number":7}
	let response = await fetch(`${path}/submissions/`+submission["id"]+'/mark',{
		method: 'PATCH',
		body: JSON.stringify(mark),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(200);
	var result = await response.json();
	expect(result["id"]).toEqual(submission["id"]);
});
test("give/update mark of a submission /submissions/{id}/mark with invalid id", async () => {
		expect(submission["id"]).toBeDefined();
	let mark ={"number":7}
	let response = await fetch(`${path}/submissions/asd/mark`,{
		method: 'PATCH',
		body: JSON.stringify(mark),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);

});


test("give/update mark of a submission /submissions/{id}/mark with invalid mark", async () => {
		expect(submission["id"]).toBeDefined();
	let mark ={"number":"asd"}
	let response = await fetch(`${path}/submissions/`+submission["id"]+'/mark',{
		method: 'PATCH',
		body: JSON.stringify(mark),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(400);

});


test("give/update mark of a submission /submissions/{id}/mark with not present id", async () => {
	let mark ={"number":7}
	let response = await fetch(`${path}/submissions/4993993/mark`,{
		method: 'PATCH',
		body: JSON.stringify(mark),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	expect(response.status).toEqual(404);

});