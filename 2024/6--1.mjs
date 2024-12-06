let input = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));
let guard;
guard: for (let row = 0; row < map.length; row++)
  for (let column = 0; column < map[row].length; column++)
    if (
      map[row][column] === "^" ||
      map[row][column] === ">" ||
      map[row][column] === "v" ||
      map[row][column] === "<"
    ) {
      guard = { row, column, direction: map[row][column] };
      break guard;
    }
while (
  0 <= guard.row &&
  guard.row < map.length &&
  0 <= guard.column &&
  guard.column < map[0].length
) {
  const nextPosition =
    guard.direction === "^"
      ? { row: guard.row - 1, column: guard.column }
      : guard.direction === ">"
      ? { row: guard.row, column: guard.column + 1 }
      : guard.direction === "v"
      ? { row: guard.row + 1, column: guard.column }
      : guard.direction === "<"
      ? { row: guard.row, column: guard.column - 1 }
      : (() => {
          throw new Error();
        })();
  if (
    0 <= nextPosition.row &&
    nextPosition.row < map.length &&
    0 <= nextPosition.column &&
    nextPosition.column < map[0].length &&
    map[nextPosition.row][nextPosition.column] === "#"
  )
    guard.direction =
      guard.direction === "^"
        ? ">"
        : guard.direction === ">"
        ? "v"
        : guard.direction === "v"
        ? "<"
        : guard.direction === "<"
        ? "^"
        : (() => {
            throw new Error();
          })();
  else {
    map[guard.row][guard.column] = "X";
    guard.row = nextPosition.row;
    guard.column = nextPosition.column;
  }
}
let positionsCount = 0;
for (let row = 0; row < map.length; row++)
  for (let column = 0; column < map[row].length; column++)
    if (map[row][column] === "X") positionsCount++;
console.log(positionsCount);
