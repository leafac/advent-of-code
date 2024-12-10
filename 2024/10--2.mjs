let input = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;

const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));
let ratingsSum = 0;
for (let startRow = 0; startRow < grid.length; startRow++)
  for (let startColumn = 0; startColumn < grid[startRow].length; startColumn++)
    (function step(row, column, height) {
      if (
        row < 0 ||
        grid.length <= row ||
        column < 0 ||
        grid[row].length <= column ||
        grid[row][column] !== height
      )
        return;
      if (height === 9) {
        ratingsSum++;
        return;
      }
      step(row - 1, column, height + 1);
      step(row, column + 1, height + 1);
      step(row + 1, column, height + 1);
      step(row, column - 1, height + 1);
    })(startRow, startColumn, 0);
console.log(ratingsSum);
