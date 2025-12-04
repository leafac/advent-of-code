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

while (1) {
  let changed = false;
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
      ) {
        grid[row][column] = "x";
        changed = true;
      }
  if (!changed) break;
}

let count = 0;
for (const row of grid) {
  for (const column of row) {
    if (column === "x") count++;
  }
}
console.log(count);
