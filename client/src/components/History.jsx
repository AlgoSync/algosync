import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProblemLogDisplay } from "../state/logDisplay";
import { all } from "axios";
export const History = () => {
  const allProblems = useSelector((state) => state.problemsLog);
  const displayProblems = useSelector((state) => state.displayProblems);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState([]);
  // effect hook to set display problems once
  useEffect(() => {
    dispatch(setProblemLogDisplay(allProblems));
  }, []);

  useEffect(() => {
    console.log("effect hook : ", displayProblems);
    const displayProblemComponents = [];
    displayProblems.forEach((problem, index) =>
      displayProblemComponents.push(
        <div key={index}>
          Problem: No. {problem.question_id} - {problem.question_title}
          Solved: {problem.solved}
        </div>
      )
    );
    setDisplay(displayProblemComponents);
  }, [displayProblems]);

  // six buttons, one per category
  const priorityKeys = {
    1: "Low Priority",
    2: "Medium Priority",
    3: "High Priority",
  };
  const difficultyKeys = {
    1: "Easy Difficulty",
    2: "Medium Difficulty",
    3: "Hard Difficulty",
  };
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
        {difficultyKeys[i]}
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
        {priorityKeys[i]}
      </button>
    );
  }

  return (
    <div>
      <section>
        <div className="history-heading-container">
          <h1>AlgoSync</h1>
        </div>
        <div>
          <button>All Problems</button>
          {buttons}
        </div>
        <div className="flashcard-bundles">{display}</div>
      </section>
    </div>
  );
};
