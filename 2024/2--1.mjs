const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

let safeReports = 0;
reports: for (const report of input.trim().split("\n")) {
  const levels = report.split(" ").map((levelString) => parseInt(levelString));
  if (levels[1] < levels[0]) levels.reverse();
  for (let levelIndex = 1; levelIndex < levels.length; levelIndex++) {
    const difference = levels[levelIndex] - levels[levelIndex - 1];
    if (difference < 1 || 3 < difference) continue reports;
  }
  safeReports++;
}
console.log(safeReports);
