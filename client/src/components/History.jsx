import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProblemLogDisplay } from "../state/logDisplay";
import { useNavigate } from "react-router-dom";
import { titleToURL } from "../helpers/methods";
import { difficultyKey, priorityKey } from "../helpers/keys";
import { LogoutButton } from "./Logout";
export const History = () => {
  const allProblems = useSelector((state) => state.problemsLog);
  const displayProblems = useSelector((state) => state.displayProblems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  this piece of state's sole job is to turn the array of display problem objects into elements to be rendered (see two effect hooks down) .
  // we can move it to the store to be consistent.
  const [display, setDisplay] = useState([]);

  // effect hook to set display problems once
  useEffect(() => {
    dispatch(setProblemLogDisplay(allProblems));
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
      <section>
        <div className="history-heading-container">Problem Log</div>
        <div>
          {/* Button to navigate back to  main app page to work on a new problem*/}
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded"
            onClick={() => navigate("/app")}
          >
            Try a New Problem
          </button>

          <button onClick={() => dispatch(setProblemLogDisplay(allProblems))}>
            All Problems
          </button>
        </div>
        <div className="flashcard-bundles">{buttons}</div>
        <div> {display}</div>
      </section>
      <LogoutButton clickHandler={() => navigate("/logout")} />
    </div>
  );
};
