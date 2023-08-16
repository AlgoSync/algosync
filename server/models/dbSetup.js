// this file was used for importing the csv file into ElephantSQL
// just leaving it here for my future reference

import dotenv from "dotenv";
dotenv.config();

import pkg from 'pg';
const { Client } = pkg;
import fs from "fs";
import abc from 'pg-copy-streams';
const { from } = abc;

// Replace with your actual connection URI
const connectionUri = process.env.PG_URI;

const client = new Client({
    connectionString: connectionUri,
});

client.connect();

// const createTableQuery = `
//     CREATE TABLE problems (
//         question_id SERIAL PRIMARY KEY,
//         question_title VARCHAR(255), 
//         question_title_slug VARCHAR(255) UNIQUE, 
//         question_difficulty INT
//     );
// `;

// client.query(createTableQuery)
//     .then(() => console.log('Table created successfully'))
//     .catch(err => console.error('Error creating table:', err));

// const copyQuery = `
//     COPY problems FROM '/leetcode_problems.csv' DELIMITER ',' CSV HEADER;
//     `;

// client.query(copyQuery)
//     .then(() => console.log('Data loaded successfully'))
//     .catch(err => console.error('Error loading data:', err));

/*
const copyQuery = `
COPY problems FROM STDIN CSV HEADER;
`;

// const copyQuery = `
// COPY problems FROM STDIN DELIMITER ',' CSV HEADER;
// `;


// Use client.copyFromStream to pipe data from a readable stream (e.g., your CSV file) to STDIN
const stream = fs.createReadStream('./leetcode_problems.csv');
const query = client.query(from(copyQuery));
stream.pipe(query)
    .on('finish', () => {
        console.log('Data loaded successfully');
        client.end();
    })
    .on('error', err => {
        console.error('Error loading data:', err);
        client.end();
    });
*/

// TODO: for debugging why selecting the problem by the slug title isn't working
const selectQuery = `
    SELECT * FROM problems WHERE problems.question_id = 3043 LIMIT 10;
`

client.end();