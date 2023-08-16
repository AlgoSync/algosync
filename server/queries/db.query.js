const query = {};

// tables:
/*
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL
);
*/
/*
CREATE TABLE problems(
    question_id SERIAL PRIMARY KEY, 
    question_title VARCHAR(255), 
    question_title_slug VARCHAR(255) UNIQUE, 
    question_difficulty INT
);
*/

export default query;
