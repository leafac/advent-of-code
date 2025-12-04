let input = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;

const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let countOfRollsOfPaperAccessibleByTheForklift = 0;

for (let row = 0; row < grid.length; row++)
  for (let column = 0; column < grid[0].length; column++)
    if (
      grid[row][column] === "@" &&
      [
        grid[row - 1]?.[column],
        grid[row - 1]?.[column + 1],
        grid[row]?.[column + 1],
        grid[row + 1]?.[column + 1],
        grid[row + 1]?.[column],
        grid[row + 1]?.[column - 1],
        grid[row]?.[column - 1],
        grid[row - 1]?.[column - 1],
      ].filter((element) => element === "@").length < 4
    )
      countOfRollsOfPaperAccessibleByTheForklift++;

console.log(countOfRollsOfPaperAccessibleByTheForklift);
