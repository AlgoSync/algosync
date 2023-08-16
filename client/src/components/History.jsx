import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProblemLogDisplay } from "../state/logDisplay";
export const History = () => {
  const allProblems = useSelector((state) => state.problemsLog);
  const displayProblems = useSelector((state) => state.displayProblems);
  const dispatch = useDispatch();

  // effect hook to set display problems once
  useEffect(() => {
    dispatch(setProblemLogDisplay(allProblems));
  }, []);

  render(
    <div>
      <section>
        <div className="history-heading-container">
          <h1>AlgoSync</h1>
        </div>
        <div>
          <button>All Problems</button>
        </div>
        <div className="flashcard-bundles"></div>
      </section>
    </div>
  );
};
