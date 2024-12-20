let input = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
`;

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let start;
let end;
for (let row = 0; row < map.length; row++)
  for (let column = 0; column < map[row].length; column++) {
    if (map[row][column] === "S") start = { row, column };
    if (map[row][column] === "E") end = { row, column };
  }

let bestPath;
{
  const work = [{ ...start, picoseconds: 0, trace: new Map() }];
  const visited = new Set();
  while (true) {
    let { row, column, picoseconds, trace } = work.shift();
    const key = JSON.stringify({ row, column });
    if (map[row][column] === "#" || visited.has(key)) continue;
    visited.add(key);
    trace = new Map(trace).set(key, picoseconds);
    if (map[row][column] === "E") {
      bestPath = trace;
      break;
    }
    picoseconds++;
    work.push(
      { row: row - 1, column, picoseconds, trace },
      { row: row, column: column + 1, picoseconds, trace },
      { row: row + 1, column, picoseconds, trace },
      { row: row, column: column - 1, picoseconds, trace }
    );
  }
}
const bestPicosecondsWithoutCheating = bestPath.get(JSON.stringify(end));

const cheatsSavings = [];
for (const [rowColumnString, picoseconds] of bestPath) {
  const { row, column } = JSON.parse(rowColumnString);
  const work = [
    {
      row,
      column,
      picoseconds,
      cheatingAvailable: 1,
      trace: new Set(),
      cheat: [],
    },
  ];
  while (0 < work.length) {
    let { row, column, picoseconds, cheatingAvailable, trace, cheat } =
      work.shift();
    const key = JSON.stringify({ row, column });
    if (
      row < 0 ||
      map.length <= row ||
      column < 0 ||
      map[row].length <= column ||
      bestPicosecondsWithoutCheating < picoseconds ||
      trace.has(key)
    )
      continue;
    trace = new Set(trace).add(key);
    if (key !== rowColumnString && bestPath.has(key)) {
      cheatsSavings.push({
        cheat,
        savings: bestPath.get(key) - picoseconds,
      });
      continue;
    }
    if (map[row][column] === "#") {
      if (0 < cheatingAvailable) {
        cheat = [...cheat, key];
        cheatingAvailable--;
      } else continue;
    }
    picoseconds++;
    work.push(
      {
        row: row - 1,
        column,
        picoseconds,
        cheatingAvailable,
        trace,
        cheat,
      },
      {
        row: row,
        column: column + 1,
        picoseconds,
        cheatingAvailable,
        trace,
        cheat,
      },
      {
        row: row + 1,
        column,
        picoseconds,
        cheatingAvailable,
        trace,
        cheat,
      },
      {
        row: row,
        column: column - 1,
        picoseconds,
        cheatingAvailable,
        trace,
        cheat,
      }
    );
  }
}
// console.dir(
//   cheatsSavings.sort((a, b) => a.savings - b.savings),
//   { maxArrayLength: Infinity }
// );
console.log(
  cheatsSavings.filter((cheatSaving) => 100 <= cheatSaving.savings).length
);
