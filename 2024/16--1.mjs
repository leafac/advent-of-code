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
// 7036

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
// 11048

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));
const visited = new Set();
const work = [{ row: map.length - 2, column: 1, direction: ">", score: 0 }];
while (true) {
  work.sort(({ score: scoreA }, { score: scoreB }) => scoreA - scoreB);
  const { row, column, direction, score } = work.shift();
  const key = JSON.stringify({ row, column, direction });
  if (visited.has(key) || map[row][column] === "#") continue;
  visited.add(key);
  if (map[row][column] === "E") {
    console.log(score);
    break;
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
  });
  work.push({
    row: direction === "^" ? row - 1 : direction === "v" ? row + 1 : row,
    column:
      direction === ">" ? column + 1 : direction === "<" ? column - 1 : column,
    direction,
    score: score + 1,
  });
}
