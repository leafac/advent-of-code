input = `
OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....
`;

input = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;

// "OO.O.O..##"
// "OO.#.O..##"

// 1. Iterate column by column from the bottom up
// 2. Collect round rocks in an array and then insert them when I hit a #

board = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => line.split(""));

const width = board[0].length;
const height = board.length;

// Transpose the board
newBoard = [];
for (let c = 0; c < height; c++) {
  let row = [];
  for (let r = 0; r < width; r++) {
    row.push(board[r][c]);
  }
  newBoard.push(row.join(""));
}
board = newBoard;

// Iterate through each row split on hashes, with in the groups, count the round rocks and dots and then re-arrange
newBoard = [];
for (let r = 0; r < height; r++) {
  let row = board[r];
  let groups = row.split("#");
  console.log("groups", groups, groups.join("#"));
  const newGroups = groups.map((x) => {
    let countRoundRocks = 0;
    for (let i = 0; i < x.length; i++) {
      if (x[i] === "O") countRoundRocks++;
    }
    return "O".repeat(countRoundRocks) + ".".repeat(x.length - countRoundRocks);
  });
  const newRow = newGroups.join("#");
  newBoard.push(newRow);
}
board.forEach((row) => console.log(row));

console.log("---");

board = newBoard;

board.forEach((row) => console.log(row));

sum = 0;
for (let c = 0; c < board[0].length; c++) {
  const factor = width - c;
  let countRoundRocks = 0;
  for (let r = 0; r < board.length; r++) {
    if (board[r][c] === "O") countRoundRocks++;
  }
  sum += countRoundRocks * factor;
}

console.log("sum", sum);

// 110779
