import request from 'supertest';
// import path from 'path';
// import assert from 'assert';
// import fs from 'fs';
import db from '../server/config/dbConnect';

const server = 'http://localhost:3000';


describe('POST to sign up route', () => {

    it('should add a new account to database', async () => {
        // create test user account to be submitted
        const user = {
            "email": "testuser@test.com",
            "password": "12345"
        };

        const response = await request(server)
            .post('/users')
            .send(user)

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    })
});

describe('POST to login route', () => {
    async function deleteTest() {
        try{
            const query = 'DELETE FROM users WHERE username = $1'
            await db.query(query, ['testuser@test.com']);
            console.log('Data should be deleted from table')
        }
        catch(err){
            console.log('Could not delete test data');
        }
    }

    afterEach(()=>{
        deleteTest();
    });

    it('should login successfully', async () => {
        const user = {
            "email": "testuser@test.com",
            "password": "12345"
        };
        const response = await request(server)
            .post('/users/login')
            .send(user)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('password');

    });

    it('should login unsuccessfully', async () => {
        const user = {
            "email": "failingtest123456@test.com",
            "password": "failingtest123456"
        };
        const response = await request(server)
            .post('/users/login')
            .send(user)
        expect(response.status).toBe(500);
    });
})