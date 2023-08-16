import db from "../config/dbConnect.js";
import fetch from "node-fetch";
import query from "../queries/db.query.js";

const ProblemsController = {
  getProblem: async (req, res, next) => {
    console.log("getProblemHIT!!!");
    //PULL URL OFF REQ QUERY
    const { url } = req.query;
    const problem_slug = url.match(/\/([^/]+)\/$/)[1];
    console.log('problemsController.js line 11 slug: ', problem_slug);

    try {
      //BUILD VALUES ARRAY FOR INSERT
      const values = [problem_slug];
      //INITIATE INSERT TO DATABASE
      const getProblem = await db.query(
        query.getProblem,
        values
      );
      //BUILD RES.LOCALS RESPONSE OBJECT
      res.locals.problem = getProblem.rows[0];
      return next();
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
    const { userID } = req.params;
    try {
      //BUILD QUERY
      const values = [userID];
      //INITIATE QUERY TO DB
      const getHistory = await db.query(
        query.getUserFlashcards, 
        values
      );
      //BUILD RES.LOCALS RESPONSE OBJECT
      res.locals.history = getHistory.rows[0];
      return next();
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
      date_last_solved
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
        date_last_solved
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
