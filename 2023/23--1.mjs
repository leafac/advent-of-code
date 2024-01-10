let input = `___`;

// input = `
// #.#####################
// #.......#########...###
// #######.#########.#.###
// ###.....#.>.>.###.#.###
// ###v#####.#v#.###.#.###
// ###.>...#.#.#.....#...#
// ###v###.#.#.#########.#
// ###...#.#.#.......#...#
// #####.#.#.#######.#.###
// #.....#.#.#.......#...#
// #.#####.#.#.#########v#
// #.#...#...#...###...>.#
// #.#.#v#######v###.###v#
// #...#.>.#...>.>.#.###.#
// #####v#.#.###v#.#.###.#
// #.....#...#...#.#.#...#
// #.#########.###.#.#.###
// #...###...#...#...#.###
// ###.###.#.###v#####v###
// #...#...#.#.>.>.#.>.###
// #.###.###.#.###.#.#v###
// #.....###...###...#...#
// #####################.#
// `;

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const worklist = [
  {
    position: { x: 1, y: 0 },
    direction: undefined,
    visitedPositions: new Set(),
  },
];
const hikeLengths = [];
while (worklist.length > 0) {
  const state = worklist.pop();
  const positionKey = JSON.stringify(state.position);
  if (
    state.position.x < 0 ||
    state.position.x >= map[0].length ||
    state.position.y < 0 ||
    state.position.y >= map.length ||
    state.visitedPositions.has(positionKey) ||
    map[state.position.y][state.position.x] === "#" ||
    (map[state.position.y][state.position.x] !== "." &&
      map[state.position.y][state.position.x] !== state.direction)
  )
    continue;
  if (state.position.y === map.length - 1)
    hikeLengths.push(state.visitedPositions.size);
  const visitedPositions = new Set([...state.visitedPositions, positionKey]);
  worklist.push(
    {
      position: { x: state.position.x, y: state.position.y - 1 },
      direction: "^",
      visitedPositions,
    },
    {
      position: { x: state.position.x + 1, y: state.position.y },
      direction: ">",
      visitedPositions,
    },
    {
      position: { x: state.position.x, y: state.position.y + 1 },
      direction: "v",
      visitedPositions,
    },
    {
      position: { x: state.position.x - 1, y: state.position.y },
      direction: "<",
      visitedPositions,
    }
  );
}

console.log(hikeLengths.sort((a, b) => b - a)[0]);
