const fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'v1';
const path = host+"/"+version;
var review = null;

var user_test = null;
test('POST USER /users/ create a user object' , async () => {
    let user={
		first_name: "Antonio", 
		last_name: "Rossi",
		username: "ElGuerrieroRosso",
		email: "andrea.matte@studenti.unitn.it",
		psw: "123456"
		};
    let response = await fetch(`${path}/users/`,{ //with right data
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(response.status).toEqual(200);
	user_test = await response.json();
	expect(user_test["user_id"]).toBeDefined();
});

test("get /users/userid  valid request", async () => {
    let response = await fetch(`${path}/users/`+user_test["user_id"],{ //with a valid and present id
        method: 'GET',
    });
    expect(response.status).toEqual(200);
});

test("get /users/userid  not valid request", async () => {
    let response = await fetch(`${path}/users/aaa`,{ //with a not valid id
        method: 'GET',
    });
    expect(response.status).toEqual(400);
});

test('get /users/userid with a valid but not present id' , async () => {
    let response = await fetch(`${path}/users/1233333333`,{ 
        method: 'GET',
    });
    expect(response.status).toEqual(404);
});

test('DELETE /users/userid with a valid and present id' , async () => {
    let response = await fetch(`${path}/users/`+user_test["user_id"],{
        method: 'DELETE',
    });
    expect(response.status).toEqual(200);
});

test('DELETE /users/userid with a valid but not present id' , async () => {
    let response = await fetch(`${path}/users/1233333333`,{ 
        method: 'DELETE',
    });
    expect(response.status).toEqual(404);
});

test('DELETE /users/userid with a not valid id' , async () => {
    let response = await fetch(`${path}/users/asd`,{ 
        method: 'DELETE',
    });
    expect(response.status).toEqual(400);
});










