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

const originalMap = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));
let originalGuard;
guard: for (let row = 0; row < originalMap.length; row++)
  for (let column = 0; column < originalMap[row].length; column++)
    if (
      originalMap[row][column] === "^" ||
      originalMap[row][column] === ">" ||
      originalMap[row][column] === "v" ||
      originalMap[row][column] === "<"
    ) {
      originalGuard = { row, column, direction: originalMap[row][column] };
      break guard;
    }

const markedMap = structuredClone(originalMap);
const markedGuard = structuredClone(originalGuard);
while (
  0 <= markedGuard.row &&
  markedGuard.row < markedMap.length &&
  0 <= markedGuard.column &&
  markedGuard.column < markedMap[0].length
) {
  const nextPosition =
    markedGuard.direction === "^"
      ? { row: markedGuard.row - 1, column: markedGuard.column }
      : markedGuard.direction === ">"
      ? { row: markedGuard.row, column: markedGuard.column + 1 }
      : markedGuard.direction === "v"
      ? { row: markedGuard.row + 1, column: markedGuard.column }
      : markedGuard.direction === "<"
      ? { row: markedGuard.row, column: markedGuard.column - 1 }
      : (() => {
          throw new Error();
        })();
  if (
    0 <= nextPosition.row &&
    nextPosition.row < markedMap.length &&
    0 <= nextPosition.column &&
    nextPosition.column < markedMap[0].length &&
    markedMap[nextPosition.row][nextPosition.column] === "#"
  )
    markedGuard.direction =
      markedGuard.direction === "^"
        ? ">"
        : markedGuard.direction === ">"
        ? "v"
        : markedGuard.direction === "v"
        ? "<"
        : markedGuard.direction === "<"
        ? "^"
        : (() => {
            throw new Error();
          })();
  else {
    markedMap[markedGuard.row][markedGuard.column] = "X";
    markedGuard.row = nextPosition.row;
    markedGuard.column = nextPosition.column;
  }
}

let loopCount = 0;
for (let row = 0; row < markedMap.length; row++)
  for (let column = 0; column < markedMap[row].length; column++) {
    if (
      markedMap[row][column] !== "X" ||
      (row === originalGuard.row && column === originalGuard.column)
    )
      continue;
    const map = structuredClone(originalMap);
    const guard = structuredClone(originalGuard);
    map[row][column] = "#";
    const trace = Array.from({ length: map.length }, () =>
      Array.from({ length: map[0].length }, () => new Set())
    );
    while (
      0 <= guard.row &&
      guard.row < map.length &&
      0 <= guard.column &&
      guard.column < map[0].length
    ) {
      if (trace[guard.row][guard.column].has(guard.direction)) {
        loopCount++;
        break;
      }
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
        trace[guard.row][guard.column].add(guard.direction);
        guard.row = nextPosition.row;
        guard.column = nextPosition.column;
      }
    }
  }
console.log(loopCount);
