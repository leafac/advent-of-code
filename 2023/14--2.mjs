// input = `
// O....#....
// O.OO#....#
// .....##...
// OO.#O....O
// .O.....O#.
// O.#..O.#.#
// ..O..#O..O
// .......O..
// #....###..
// #OO..#....
// `;

// input = `
// OOOOOOOOOO
// .........I
// .........I
// .........I
// .........I
// .........I
// .........I
// .........I
// .........I
// .........I
// `;

// "OO.O.O..##"
// "OO.#.O..##"

// 1. Iterate column by column from the bottom up
// 2. Collect round rocks in an array and then insert them when I hit a #

const board1 = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => line.split(""));

// ----
// NORTH: rotate(3x) -> tilt
// WEST: rotate(4x) -> tilt
// SOUTH: rotate(5x), -> tilt
// EAST: rotate(6x) -> tilt

const rotationCache = new Map();
function rotate(board) {
  const key = JSON.stringify(board);
  if (rotationCache.has(key)) {
    return rotationCache.get(key);
  }
  const rotated = [];
  for (let i = 0; i < board[0].length; i++) {
    rotated.push([]);
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const x = board.length - 1 - i;
      rotated[j][x] = board[i][j];
    }
  }
  rotationCache.set(key, rotated);
  return rotated;
}

const tiltRowCache = new Map();
function tiltRow(row) {
  const key = row;
  if (tiltRowCache.has(key)) {
    return tiltRowCache.get(key);
  }
  do {
    row = row.replaceAll(".O", "O.");
  } while (row.includes(".O"));
  tiltRowCache.set(key, row);
  return row;
}

function tilt(board) {
  const boardAsListOfStrings = board.map((row) => row.join(""));
  const tilted = [];
  for (let i = 0; i < boardAsListOfStrings.length; i++) {
    let row = boardAsListOfStrings[i];
    tilted.push(tiltRow(row));
  }
  return tilted.map((row) => row.split(""));
}

function count(board) {
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    const count = row.filter((x) => x === "O").length;
    sum += count * (board.length - i);
  }
  return sum;
}

function cycle(board) {
  //            east        south       west       north
  return rotate(tilt(rotate(tilt(rotate(tilt(rotate(tilt(board))))))));
}

function main() {
  let board = rotate(rotate(rotate(board1)));
  const previousBoards = [JSON.stringify(board)];
  let cycleOffset = 0;
  for (let i = 0; i < 1_000_000_000; i++) {
    if (i % 100_000 === 0) console.log(i);
    board = cycle(board);
    const prevIndex = previousBoards.indexOf(JSON.stringify(board));
    if (prevIndex > -1) {
      cycleOffset = prevIndex;
      break;
    }
    previousBoards.push(JSON.stringify(board));
  }
  const index =
    ((1_000_000_000 - cycleOffset) % (previousBoards.length - cycleOffset)) +
    cycleOffset;
  board = JSON.parse(previousBoards[index]);
  const teardown = rotate(board);
  console.log(teardown.map((x) => x.join("")).join("\n"));
  console.log(count(teardown));
}

main();

// console.log(board1.join("\n"));
// console.log("cycle");
// console.log(cycle(board1).join("\n"));
// console.log(rotate(rotate(rotate(board1))).join("\n"));
// console.log(tilt(rotate(rotate(rotate(board1)))).join("\n"));
// console.log(rotate(tilt(rotate(rotate(rotate(board1))))).join("\n"));
// console.log(count(rotate(tilt(rotate(rotate(rotate(board1)))))));