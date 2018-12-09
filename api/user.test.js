const fetch = require('node-fetch');
const host = process.env.host || 'http://localhost:3000';
const version = 'V1';
const path = host; //= ${host}/${version}
var review = null;
const test_comment = "not a common comment really";

test('POST USER /users/ create a user object' , async () => {
    let user= {
		first_name: "Antonio", 
		last_name: "Rossi",
		username: "ElGuerrieroRosso",
		email: "andrea.matte@studenti.unitn.it",
		psw: "123456"
		};
    let response = await fetch(`${host}/users/`,{ //with right data
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(response.status).toEqual(201);
});

test("get /users/userid  valid request", async () => {
    let response = await fetch(`${host}/users/1`,{ //with a valid and present id
        method: 'GET',
    });
    expect(response.status).toEqual(200);
});

test("get /users/userid  not valid request", async () => {
    let response = await fetch(`${host}/users/aaa`,{ //with a not valid id
        method: 'GET',
    });
    expect(response.status).toEqual(400);
});

test('get /users/userid with a valid but not present id' , async () => {
    let response = await fetch(`${host}/users/1233333333`,{ //with a not present id
        method: 'GET',
    });
    expect(response.status).toEqual(404);
});

test('DELETE /users/userid with a valid and present id' , async () => {
    let response = await fetch(`${host}/users/1`,{ //with a not present id
        method: 'DELETE',
    });
    expect(response.status).toEqual(200);
});

test('DELETE /users/userid with a valid but not present id' , async () => {
    let response = await fetch(`${host}/users/1233333333`,{ //with a not present id
        method: 'DELETE',
    });
    expect(response.status).toEqual(404);
});

test('DELETE /users/userid with a valid but not present id' , async () => {
    let response = await fetch(`${host}/users/asd`,{ //with wrong data
        method: 'DELETE',
    });
    expect(response.status).toEqual(400);
});










