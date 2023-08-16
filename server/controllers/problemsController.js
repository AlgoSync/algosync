import db from "../config/dbConnect.js";
import fetch from "node-fetch";
import query from "../queries/db.query.js";

const ProblemsController = {
  getProblem: async (req, res, next) => {
    console.log("getProblemHIT!!!");
    //PULL URL OFF REQ QUERY
    const { url } = req.query;
    const problem_slug = url.match(/\/([^/]+)\/$/)[1];
    console.log("problemsController.js line 11 slug: ", problem_slug);

    try {
      //BUILD VALUES ARRAY FOR INSERT
      const values = [problem_slug];
      //INITIATE INSERT TO DATABASE
      const getProblem = await db.query(query.getProblem, values);
      //BUILD RES.LOCALS RESPONSE OBJECT
      res.locals.problem = getProblem.rows[0];
      return next();
    } catch (error) {
      return next({
        log: `${error}`,
        status: 503,
        message: { err: "An error occurred while retrieving information" },
      });
    }
  },

  getUsersProblems: async (req, res, next) => {
    //PULL USER ID OFF REQ PARAMS
    const { user_id } = req.params;
    console.log(user_id);
    try {
      //BUILD VALUES ARRAY
      const values = [user_id];
      //INITIATE QUERY TO DB
      const usersProblems = await db.query(query.getUserFlashcards, values);
      console.log(usersProblems);
      //BUILD RES.LOCALS RESPONSE OBJECT
      res.locals.problems = usersProblems.rows;

      //PASS OUT OF MIDDLEWARE
      return next();
    } catch (error) {
      return next({
        log: `${error}`,
        status: 503,
        message: { err: "An error occurred during problem retrieval" },
      });
    }
  },

  addProblem: async (req, res, next) => {
    console.log(req.body);
    //PULL DATA OFF REQ BODY
    const {
      user_id,
      question_id,
      question_title,
      question_difficulty,
      priority,
      solved,
      times_solved,
      date,
    } = req.body;

    const difficulty = question_difficulty;
    const date_last_solved = date;
    const is_solved = solved;

    try {
      //BUILD VALUES ARRAY FOR INSERT
      const values = [
        user_id,
        question_id,
        question_title,
        difficulty,
        priority,
        is_solved,
        times_solved,
        date_last_solved,
      ];
      //INITIATE INSERT TO DATABASE
      const newProblem = await db.query(
        query.createFlashcardCustomized,
        values
      );
      //BUILD RES.LOCALS RESPONSE OBJECT IF NEEDED
      return next();
    } catch (error) {
      return next({
        log: `${error}`,
        status: 503,
        message: { err: "An error occurred while attempting to add problem" },
      });
    }
  },
};

export default ProblemsController;
