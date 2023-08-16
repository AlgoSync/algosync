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

// CREATE TABLE ENTRIES

// create users
query.createUser =
    'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *';
// create problems
query.createProblem =
    'INSERT INTO problems(email, password) VALUES($1, $2) RETURNING *';
// create flashcards
query.createFlashcardCustomized =
    `INSERT INTO flashcards(
        user_id, 
        question_id, 
        question_title, 
        difficulty, 
        priority, 
        is_solved, 
        times_solved, 
        date_last_solved
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;

query.createFlashcardDefaults =
    `INSERT INTO flashcards(
        user_id, 
        question_id, 
        question_title, 
        difficulty, 
        priority
    ) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

// read

// selecting all the flashcards for a given user, based on the user ID
// selecting all flashcards for a given user, based on a given difficulty level
// selecting one flashcard based on the flashcard ID

// Note: everything below this line is a lower priority. 
// For MVP purposes, let's focus on building out the entire backend routes for the create and read queries.

export default query;
