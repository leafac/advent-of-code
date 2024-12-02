let input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

let safeReports = 0;
for (const report of input.trim().split("\n")) {
  const levels = report.split(" ").map((levelString) => parseInt(levelString));
  {
    const levelInvalidLevel = invalidLevel(levels);
    if (
      levelInvalidLevel === undefined ||
      invalidLevel([
        ...levels.slice(0, levelInvalidLevel - 1),
        ...levels.slice(levelInvalidLevel),
      ]) === undefined ||
      invalidLevel([
        ...levels.slice(0, levelInvalidLevel),
        ...levels.slice(levelInvalidLevel + 1),
      ]) === undefined
    )
      safeReports++;
  }
  levels.reverse();
  {
    const levelInvalidLevel = invalidLevel(levels);
    if (
      levelInvalidLevel === undefined ||
      invalidLevel([
        ...levels.slice(0, levelInvalidLevel - 1),
        ...levels.slice(levelInvalidLevel),
      ]) === undefined ||
      invalidLevel([
        ...levels.slice(0, levelInvalidLevel),
        ...levels.slice(levelInvalidLevel + 1),
      ]) === undefined
    )
      safeReports++;
  }
}
function invalidLevel(levels) {
  for (let levelIndex = 1; levelIndex < levels.length; levelIndex++) {
    const difference = levels[levelIndex] - levels[levelIndex - 1];
    if (difference < 1 || 3 < difference) return levelIndex;
  }
}
console.log(safeReports);
