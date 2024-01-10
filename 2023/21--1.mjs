let input = `___`;

// input = `
// ...........
// .....###.#.
// .###.##..#.
// ..#.#...#..
// ....#.#....
// .##..S####.
// .##..#...#.
// .......##..
// .##.#.####.
// .##..##.##.
// ...........
// `;

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let startingCoordinate;

startingCoordinateSearch: for (const y of map.keys())
  for (const x of map[y].keys())
    if (map[y][x] === "S") {
      startingCoordinate = { x, y };
      break startingCoordinateSearch;
    }

const reachablePlotsCache = new Map();

function reachablePlots(x, y, steps) {
  if (
    !(0 <= x && x < map[0].length) ||
    !(0 <= y && y < map.length) ||
    map[y][x] === "#" ||
    steps < 0
  )
    return new Set();
  const key = JSON.stringify({ x, y, steps });
  const cached = reachablePlotsCache.get(key);
  if (cached !== undefined) return cached;
  const plots =
    steps === 0
      ? new Set([key])
      : new Set([
          ...reachablePlots(x, y - 1, steps - 1),
          ...reachablePlots(x + 1, y, steps - 1),
          ...reachablePlots(x, y + 1, steps - 1),
          ...reachablePlots(x - 1, y, steps - 1),
        ]);
  reachablePlotsCache.set(key, plots);
  return plots;
}

const plots = reachablePlots(startingCoordinate.x, startingCoordinate.y, 64);

console.log(plots.size);

let mapString = "";
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++)
    mapString +=
      map[y][x] === "#"
        ? "#"
        : [...plots].find((plotString) => {
            const plot = JSON.parse(plotString);
            return plot.x === x && plot.y === y;
          }) !== undefined
        ? "O"
        : ".";
  mapString += "\n";
}
console.log(mapString);
