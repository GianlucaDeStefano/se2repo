fetch = require('node-fetch');

var version = 'V1';

var host = process.env.BASEURL || 'http://localhost:3000';


test("Test GET /exams", async () => {

    let response = await fetch(`${host}/${version}/exams`,{
        method: 'GET',
    });
    expect(response.status).toEqual(200);
});

test("Test POST /exams with correct data", async => {

	let exam = {
		"id": 12,
		"owner_id": 30;
		"questions": [
			{
				"id": 1;
				"owner_id": 30;
				"task_type": MULTIPLE;
				"text": "The best VCS?";
				"answers": [
					{
						"text": "Git"
						"correct": false
					},
					{
						"text": "Paper"
						"correct": false
					},
					{
						"text": "My brain"
						"correct": true
					}
				]
			},
			{
				"id": 2;
				"owner_id": 30;
				"task_type": OPEN;
				"text": "Why?";
				"answers": []
			}
		]
	};

	let response = await fetch('${host}/${version/exams}', {
		method: 'POST',
		body: JSON.stringify(exam),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toEqual(200);

	let res = JSON.parse(response.text());
	expect(res).toIncludeKey('id');
	expect(res).toIncludeKey('owner_id');
});

//the exam's and questions' owner_id aren't the same
test("Test POST /exams with wrong data", async => {

	let exam = {
		"id": 30,
		"owner_id": 10;
		"questions": [
			{
				"id": 1;
				"owner_id": 13;
				"task_type": MULTIPLE;
				"text": "The best VCS?";
				"answers": [
					{
						"text": "Git"
						"correct": false
					},
					{
						"text": "Paper"
						"correct": false
					},
					{
						"text": "My brain"
						"correct": true
					}
				]
			},
			{
				"id": 2;
				"owner_id": 14;
				"task_type": OPEN;
				"text": "Why?";
				"answers": []
			}
		]
	};

	let response = await fetch('${host}/${version/exams}', {
		method: 'POST',
		body: JSON.stringify(exam),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	expect(response.status).toEqual(400);
});
