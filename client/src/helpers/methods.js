const titleToURL = function (title) {
  const titleLower = title.toLowerCase();
  const titleKebab = titleLower.replaceAll(" ", "-");
  const url = `https://leetcode.com/problems/${titleKebab}/`;
  return url;
};

export { titleToURL };
