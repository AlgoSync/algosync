const titleToURL = function (title) {
  const titleLower = title.toLowerCase();
  const titleKebab = titleLower.replaceAll(" ", "-");
  const url = `https://leetcode.com/problems/${titleKebab}/`;
  return url;
};
// async call to LeetCode api - replace with call to our backend when that works.
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

export { titleToURL, getLeetCodeProblem };
