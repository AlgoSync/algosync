import request from 'supertest';
// import path from 'path';
// import assert from 'assert';
import fs from 'fs';


const server = 'http://localhost:3000';

describe ('POST to sign up route', () => {
    
    it ('should add a new account to database', async () => {
        // create test user account to be submitted
        const user = {
        "email": "testuser@test.com",
        "password": "12345"
        };
        
    const response = await request(server)
        .post ('/users')
        .send(user)
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    })
});