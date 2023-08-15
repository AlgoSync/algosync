import React from "react";
import { useSelector, useDispatch } from "react-redux";
export const ProblemDisplay = () => {
  const problem = useSelector((state) => state.workingProblem);
  const dispatch = useDispatch();

  return (
    <div>
      Problem: No. {problem.question_id} - {problem.question_title}
    </div>
  );
};
