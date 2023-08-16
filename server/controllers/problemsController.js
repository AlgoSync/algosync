import db from "../config/dbConnect.js";
import fetch from "node-fetch";

const ProblemsController = {
  getProblem: async (req, res, next) => {
    console.log("getProblemHIT!!!");
    const { url } = req.query;
    const problem_slug = url.match(/\/([^/]+)\/$/)[1];
    console.log(problem_slug);

    try {
      //NEEDS TO BE REDONE TO QUERY DATABASE INSTEAD********
      const problems = await fetch(
        "https://leetcode.com/api/problems/algorithms/"
      );

      const parsedResponse = await problems.json();

      const list = parsedResponse["stat_status_pairs"].map((problem) => {
        return {
          question_id: problem.stat.question_id,
          question_title: problem.stat.question__title,
          question_title_slug: problem.stat.question__title_slug,
          difficulty: problem.difficulty.level,
        };
      });

      //console.log(list);

      const finalProblem = await list.filter(
        (problem) => problem.question_title_slug === problem_slug
      )[0];
      console.log(finalProblem);

      //console.log(parsedResponse);

      //console.log(problems);
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
    try {
      //BUILD QUERY
      //BUILD VALUES ARRAY FOR INSERT
      //INITIATE INSERT TO DATABASE
      //BUILD RES.LOCALS RESPONSE OBJECT
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
