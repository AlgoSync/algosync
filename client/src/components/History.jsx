import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProblemLogDisplay } from "../state/logDisplay";
import { setProblemLog } from "../state/problemsLog";
import { useNavigate } from "react-router-dom";
import { titleToURL } from "../helpers/methods";
import { difficultyKey, priorityKey } from "../helpers/keys";
import { LogoutButton } from "./Logout";
export const History = () => {
  const allProblems = useSelector((state) => state.problemsLog);
  const displayProblems = useSelector((state) => state.displayProblems);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  this piece of state's sole job is to turn the array of display problem objects into elements to be rendered (see two effect hooks down) .
  // we can move it to the store to be consistent.
  const [display, setDisplay] = useState([]);

  // effect hook to set display problems once
  useEffect(() => {
    fetch(`/api/problems/${user.user_id}`)
      .then((response) => response.json())
      .then((data) => data.problems)
      .then((problemsLog) => {
        dispatch(setProblemLog(problemsLog));
        dispatch(setProblemLogDisplay(problemsLog));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // effect hook to create divs for each display problem and trigger re-render on change to state
  useEffect(() => {
    const displayProblemComponents = [];
    displayProblems.forEach((problem, index) =>
      displayProblemComponents.push(
        <div key={index}>
          {/* Title contains link to problem on leetcode */}
          <a
            href={titleToURL(problem.question_title)}
            className="text-blue-600 underline"
          >
            Problem: No. {problem.question_id} - {problem.question_title}{" "}
          </a>
          | Solved: {problem.solved}
        </div>
      )
    );
    setDisplay(displayProblemComponents);
  }, [displayProblems]);

  // render buttons for filtering display problems from allProblems
  const buttons = [];
  for (let i = 1; i <= 3; i++) {
    buttons.push(
      <button
        key={`d${i}`}
        className="bg-teal-400 hover:bg-teal-600 text-white font-bold p-2 m-2 rounded"
        onClick={() =>
          dispatch(
            setProblemLogDisplay(allProblems.filter((p) => p.difficulty === i))
          )
        }
      >
        {difficultyKey[i]}
      </button>
    );
    buttons.push(
      <button
        key={`p${i}`}
        className="bg-blue-300 hover:bg-blue-500 text-white font-bold p-2 m-2 rounded"
        onClick={() =>
          dispatch(
            setProblemLogDisplay(allProblems.filter((p) => p.priority === i))
          )
        }
      >
        {priorityKey[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center max-w-6xl mx-auto px-6 bg-slate-50 drop-shadow-lg border-solid border-2 border-gray-500 rounded-xl h-full w-4/5">
        <div className="flex flex-row justify-center text-3xl my-4">
          Problems Log
        </div>
        <div className="flex flex-row justify-center">
          {/* Button to navigate back to  main app page to work on a new problem*/}
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 mx-6 rounded"
            onClick={() => navigate("/app")}
          >
            Try a New Problem
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl my-4">Filter Problems By:</div>
          <button
            onClick={() => dispatch(setProblemLogDisplay(allProblems))}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 mx-6 rounded"
          >
            All Problems
          </button>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-3 my-6 mx-6 justify-around">
          {buttons}
        </div>
        <div> {display}</div>
      </div>
      <div className="flex flex-row justify-center items-end h-20">
        <LogoutButton clickHandler={() => navigate("/logout")} />
      </div>
    </div>
  );
};
