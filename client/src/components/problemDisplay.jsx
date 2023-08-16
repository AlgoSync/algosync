import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProblem } from "../state/workingProblem";
export const ProblemDisplay = () => {
  const problem = useSelector((state) => state.workingProblem);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const problemURL = useRef(null);
  const priority = useRef(null);
  const [solved, markSolved] = useState(false);
  const navigate = useNavigate();

  const handleURLSubmit = async (e) => {
    e.preventDefault();
    if (!problemURL.current) {
      alert("Enter a leetCode problem URL");
      return;
    }
    const problem = await getLeetCodeProblem(problemURL.current);
    dispatch(setProblem(problem));
  };

  const handleProblemSubmit = async (e) => {
    e.preventDefault();
    if (!priority.current) {
      console.log("please mark problem review priority");
      return;
    }

    /// this is the data that can reasonably sent back from a URL-based problem.
    //it includes difficulty , title, number, priority, date, and the user (which may be an object in our final iteration or the user_id as needed by the table )
    // time solved and date last solved will have to be matched by the backend with any existing version of the problem in the DB.
    const problemObject = {
      ...problem,
      priority: priority.current,
      date: Date.now(),
      solved,
      user,
    };

    // PUT request to
    const problemSaved = await fetch("/api/problems", {
      method: "POST",
      body: JSON.stringify(problemObject),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => response.json());
  };

  return (
    <div className="flex flex-col justify-center max-w-lg mx-auto px-6 bg-slate-50 drop-shadow-lg border-solid border-2 border-gray-500 rounded-xl h-1/2 w-2/3">
       <div className="flex flex-row justify-between my-4">
        <h2 className="flex flex-col justify-center text-xl">What will you practice today?</h2>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded" onClick={(e) => navigate("/history")}>Revisit Problems</button>
      </div>
      <form onSubmit={handleURLSubmit} className="flex justify-between">
        <input
          className="border-solid border-2 border-gray-500 rounded w-2/3 pl-2"
          type="text"
          name="problemURL"
          placeholder="LeetCode Problem URL"
          onChange={(e) => (problemURL.current = e.target.value)}
        />
        <button type="submit" className="bg-indigo-400 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"> Practice</button>
      </form>
      <div className="flex flex-row justify-center my-6 text-xl text-gray-700 font-semibold underline underline-offset-8">Problem: No. {problem.question_id} - {problem.question_title}</div>
      {/* Section for problem tagging and submission */}
      <form onSubmit={handleProblemSubmit}>
        <div className="my-2">Mark Question Review Priority: </div>
        <div className="flex flex-row justify-between">
          <button id="mark-high-prio" type="button" key="high-prio" onClick={() => (priority.current = 3)} className="break-normal w-1/4 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-2 rounded">
            High Priority
          </button>
          <button id="mark-medium-prio" type="button" key="med-prio" onClick={() => (priority.current = 2)} className="break-normal w-1/4 bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-2 rounded" >
            Medium Priority
          </button>
          <button id="mark-low-prio"  type="button" key="low-prio" onClick={() => (priority.current = 1)} className="break-normal w-1/4 bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-2 rounded">
            Low Priority
          </button>
        </div>
        <div className="flex flex-row justify-center">
          <label className="flex flex-row justify-center">
            <input
              type="checkbox"
              checked={solved}
              onClick={() => markSolved(!solved)}
            />
          </label>
          <button key="submitProblem" type="submit" className="my-2 p-2"> Save Problem </button>
        </div>
      </form>
    </div>
  );
};

async function getLeetCodeProblem(url) {
  const problem_slug = url.match(/\/([^/]+)\/$/)[1];
  const problem = await fetch("https://leetcode.com/api/problems/algorithms/")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      return data["stat_status_pairs"].map((problem) => {
        return {
          question_id: problem.stat.question_id,
          question_title: problem.stat.question__title,
          question_title_slug: problem.stat.question__title_slug,
          difficulty: problem.difficulty.level,
        };
      });
    })
    .then(
      (problems) =>
        problems.filter(
          (problem) => problem.question_title_slug === problem_slug
        )[0]
    )
    .catch((err) => console.log("Error: ", err));
  return problem;
}
