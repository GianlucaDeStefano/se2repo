fetch = require('node-fetch');

var version = 'V1';

var host = process.env.BASEURL || 'http://localhost:3000';


test("get /users/userid  valid request", async () => {
    let response = await fetch(`${host}/${version}/students/1`,{ //with a valid and present id
        method: 'GET',
    });
    expect(response.status).toEqual(200);
});

test("get /users/userid  not valid request", async () => {
    let response = await fetch(`${host}/${version}/students/aaa`,{ //with a not valid id
        method: 'GET',
    });
    expect(response.status).toEqual(400);
});

test('get /users/userid with a valid but not present id' , async () => {
    let response = await fetch(`${host}/${version}/students/1233333333`,{ //with a not present id
        method: 'GET',
    });
    expect(response.status).toEqual(404);
});

test('DELETE /users/userid with a valid and present id' , async () => {
    let response = await fetch(`${host}/${version}/students/1`,{ //with a not present id
        method: 'DELETE',
    });
    expect(response.status).toEqual(204);
});

test('DELETE /users/userid with a valid but not present id' , async () => {
    let response = await fetch(`${host}/${version}/students/1233333333`,{ //with a not present id
        method: 'DELETE',
    });
    expect(response.status).toEqual(404);
});

test('POST USER /users/ create a user object' , async () => {
    let user= {first_name: "Antonio", last_name: "Rossi",username: "ElGuerrieroRosso",email: "andrea.matte@studenti.unitn.it", };
    let response = await fetch(`${host}/${version}/students/`,{ //with a not present id
        method: 'POST',
        body: JSON.stringify(student),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(response.status).toEqual(201);
});








