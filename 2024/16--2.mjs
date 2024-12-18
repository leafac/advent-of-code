let input = `
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
`;
// 45

input = `
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
`;
// 64

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));
const visited = new Map();
let bestScore;
const bestTiles = new Set();
const work = [
  {
    row: map.length - 2,
    column: 1,
    direction: ">",
    score: 0,
    trace: new Set(),
  },
];
while (0 < work.length) {
  work.sort(({ score: scoreA }, { score: scoreB }) => scoreA - scoreB);
  let { row, column, direction, score, trace } = work.shift();
  process.stdout.write(
    `bestScore: ${bestScore} · score: ${score} · work.length: ${work.length}.\r`
  );
  const key = JSON.stringify({ row, column, direction });
  if (
    (bestScore ?? Infinity) < score ||
    (visited.get(key) ?? Infinity) < score ||
    map[row][column] === "#"
  )
    continue;
  visited.set(key, score);
  trace = new Set(trace).add(JSON.stringify({ row, column }));
  if (map[row][column] === "E") {
    bestScore ??= score;
    for (const tile of trace) bestTiles.add(tile);
    continue;
  }
  work.push({
    row,
    column,
    direction:
      direction === "^"
        ? ">"
        : direction === ">"
        ? "v"
        : direction === "v"
        ? "<"
        : direction === "<"
        ? "^"
        : (() => {
            throw new Error();
          })(),
    score: score + 1000,
    trace,
  });
  work.push({
    row,
    column,
    direction:
      direction === "^"
        ? "<"
        : direction === "<"
        ? "v"
        : direction === "v"
        ? ">"
        : direction === ">"
        ? "^"
        : (() => {
            throw new Error();
          })(),
    score: score + 1000,
    trace,
  });
  work.push({
    row: direction === "^" ? row - 1 : direction === "v" ? row + 1 : row,
    column:
      direction === ">" ? column + 1 : direction === "<" ? column - 1 : column,
    direction,
    score: score + 1,
    trace,
  });
}
console.log();
console.log(
  map
    .map((line, row) =>
      line
        .map((tile, column) =>
          bestTiles.has(JSON.stringify({ row, column })) ? "O" : tile
        )
        .join("")
    )
    .join("\n")
);
console.log(bestTiles.size);
