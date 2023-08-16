import db from "../config/dbConnect.js";
import fetch from "node-fetch";
import query from "../queries/db.query.js";

const ProblemsController = {
  getProblem: async (req, res, next) => {
    //PULL URL OFF REQ QUERY
    const { url } = req.query;
    const problem_slug = url.match(/\/([^/]+)\/$/)[1];
    console.log(problem_slug);

    try {
      //BUILD QUERY
      //BUILD VALUES ARRAY FOR QUERY
      const values = [];

      //INITIATE QUERY

      //BUILD RESPONSE OBJECT

      //PASS OUT OF MIDDLEWARE
      next();
    } catch (error) {
      return next({
        log: "Express error in getProblem Middleware",
        status: 503,
        message: { err: "An error occurred while retrieving information" },
      });
    }
  },

  getUsersProblems: async (req, res, next) => {
    //PULL USER ID OFF REQ PARAMS
    try {
      //BUILD QUERY
      //INITIATE QUERY TO DB
      //BUILD RES.LOCALS RESPONSE OBJECT
      //PASS OUT OF MIDDLEWARE
    } catch (error) {
      return next({
        log: "Express error in getUsersProblems Middleware",
        status: 503,
        message: { err: "An error occurred during problem retrieval" },
      });
    }
  },

  addProblem: async (req, res, next) => {
    //PULL DATA OFF REQ BODY
    const {
      user_id,
      question_id,
      question_title,
      difficulty,
      priority,
      is_solved,
      times_solved,
      date_last_solved,
    } = req.body;
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
      next();
    } catch (error) {
      return next({
        log: "Express error in addproblem Middleware",
        status: 503,
        message: { err: "An error occurred while attempting to add problem" },
      });
    }
  },
};

export default ProblemsController;
