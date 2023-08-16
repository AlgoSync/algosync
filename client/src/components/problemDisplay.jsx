import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProblem } from "../state/workingProblem";
export const ProblemDisplay = () => {
  const problem = useSelector((state) => state.workingProblem);
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
    const problemObject = {
      ...problem,
      priority: priority.current,
      date: Date.now(),
      solved,
      user,
    };
    // console.log(problemObject);

    // PUT request to
    const problemSaved = await fetch("/api/problems", {
      method: "POST",
      body: JSON.stringify(problemObject),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => response.json());
    //console.log(problemSaved);
    //if(problemSaved === 'SUCCESS!!!')
  };

  return (
    <div>
      <button onClick={(e) => navigate("/history")}>
        Practice Old Problems
      </button>
      <form onSubmit={handleURLSubmit}>
        <input
          type="text"
          name="problemURL"
          placeholder="LeetCode Problem URL"
          onChange={(e) => (problemURL.current = e.target.value)}
        />
        <button type="submit"> Practice</button>
      </form>
      Problem: No. {problem.question_id} - {problem.question_title}
      {/* Section for problem tagging and submission */}
      <form onSubmit={handleProblemSubmit}>
        <div>Mark Question Review Priority: </div>
        <button
          id="mark-high-prio"
          type="button"
          key="high-prio"
          onClick={() => (priority.current = 3)}
        >
          High Priority
        </button>
        <button
          id="mark-medium-prio"
          type="button"
          key="med-prio"
          onClick={() => (priority.current = 2)}
        >
          Medium Priority
        </button>
        <button
          id="mark-low-prio"
          type="button"
          key="low-prio"
          onClick={() => (priority.current = 1)}
        >
          Low Priority
        </button>
        <label>
          <input
            type="checkbox"
            checked={solved}
            onClick={() => markSolved(!solved)}
          />
        </label>
        <button key="submitProblem" type="submit">
          {" "}
          Save Problem{" "}
        </button>
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
