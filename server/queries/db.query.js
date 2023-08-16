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

// join table: 
/*
CREATE TABLE flashcards (
    flashcard_id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    question_id INT REFERENCES problems(question_id) ON DELETE CASCADE, 
    question_title VARCHAR(255) NOT NULL, 
    difficulty VARCHAR(255) NOT NULL, 
    priority VARCHAR(255) NOT NULL, 
    is_solved BOOLEAN DEFAULT false NOT NULL, 
    times_solved INT DEFAULT 0 NOT NULL, 
    date_last_solved TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

export default query;
