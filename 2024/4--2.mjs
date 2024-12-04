let input = `
.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
`;

const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));
let occurrences = 0;
for (let row = 1; row < grid.length - 1; row++)
  for (let column = 1; column < grid[row].length - 1; column++)
    if (
      grid[row][column] === "A" &&
      ((grid[row - 1][column - 1] === "M" &&
        grid[row + 1][column + 1] === "S") ||
        (grid[row - 1][column - 1] === "S" &&
          grid[row + 1][column + 1] === "M")) &&
      ((grid[row + 1][column - 1] === "M" &&
        grid[row - 1][column + 1] === "S") ||
        (grid[row + 1][column - 1] === "S" &&
          grid[row - 1][column + 1] === "M"))
    )
      occurrences++;
console.log(occurrences);
