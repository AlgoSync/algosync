import request from 'supertest';
// import path from 'path';
// import assert from 'assert';
// import fs from 'fs';
import db from "../server/config/dbConnect.js";

const server = 'http://localhost:3000';

async function deleteTest() {
    try {
        const query = 'DELETE FROM users WHERE email= $1'
        await db.query(query, ['testuser@test.com']);
        console.log('Data should be deleted from table')
    }
    catch (err) {
        console.log('Could not delete test data');
    }
}

describe('POST to sign up route', () => {

    it('should add a new account to database', () => {
        // create test user account to be submitted
        const user = {
            "email": "testuser@test.com",
            "password": "12345"
        };

        const response = request(server)
            .post(`/api/users`)
            .send(user)
            .expect('Content-Type', /json/)
            .expect('user')
            .expect(200)
       
    })
});

describe('POST to login route', () => {
    afterEach(async () => {
        await deleteTest();
    });

    it('should login successfully',  () => {
        const user = {
            "email": "testuser@test.com",
            "password": "12345"
        };
        const response = request(server)
            .post('/api/users/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect('user')

    });

    it('should login unsuccessfully', () => {
        const user = {
            "email": "failingtest123456@test.com",
            "password": "failingtest123456"
        };
        const response = request(server)
            .post('/api/users/login')
            .send(user)
            .expect(500);
    });
});