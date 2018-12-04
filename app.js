const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//---------------------------- IN-MEMORY DATABASE ----------------------------

//*********** EXAMS ***********
var exams = [
	//one exam
	{
		"id": 1,
		"owner_id": 10,
		"questions": [
			{
				"id": 1,
				"owner_id": 10,
				"task_type": MULTIPLE,
				"text": "The best VCS?",
				"answers": [
					{
						"text": "Git",
						"correct": false
					},
					{
						"text": "Paper",
						"correct": false
					},
					{
						"text": "My brain",
						"correct": true
					}
				]
			},
			{
				"id": 2,
				"owner_id": 10,
				"task_type": OPEN,
				"text": "Why?",
				"answers": []
			}
		]
	},

	//second exam
	{
		"id": 2,
		"owner_id": 20,
		"questions": [
			{
				"id": 3,
				"owner_id": 20,
				"task_type": MULTIPLE,
				"text": "Calculate 1+1.",
				"answers": [
					{
						"text": "0",
						"correct": false
					},
					{
						"text": "1",
						"correct": false
					},
					{
						"text": "2",
						"correct": true
					}
				]
			},
			{
				"id": 4,
				"owner_id": 20,
				"task_type": OPEN,
				"text": "Why?",
				"answers": []
			}
		]
	}

]
//*****************************

var courses_offered = [{id: 21, name: 'HCI'},
{id: 28, name:'sweng'}]
//----------------------------------------------------------------------------

app.get('/', (req, res) => res.send('Hello World and hello Mars!'))

app.get('/courses', (req, res) => {
   res.json(courses_offered)
})

app.listen(PORT, () => console.log('Example app listening on port'+ PORT))
