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

// input = `
// .....
// .....
// ..S..
// .....
// .....
// `;

const steps = 26501365;

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

const plots = {
  evenInnerDiamond: 0,
  oddInnerDiamond: 0,
  outerDiamond: 0,
};
const worklist = [startingCoordinate];
while (worklist.length > 0) {
  const coordinate = worklist.pop();
  if (
    coordinate.x < 0 ||
    map[0].length <= coordinate.x ||
    coordinate.y < 0 ||
    map.length <= coordinate.y ||
    ["#", "V"].includes(map[coordinate.y][coordinate.x])
  )
    continue;
  map[coordinate.y][coordinate.x] = "V";
  const distance =
    Math.abs(coordinate.x - startingCoordinate.x) +
    Math.abs(coordinate.y - startingCoordinate.y);
  plots[
    distance <= (map[0].length - 1) / 2
      ? distance % 2 === 1
        ? "evenInnerDiamond"
        : "oddInnerDiamond"
      : "outerDiamond"
  ]++;
  worklist.push(
    { x: coordinate.x, y: coordinate.y - 1 },
    { x: coordinate.x + 1, y: coordinate.y },
    { x: coordinate.x, y: coordinate.y + 1 },
    { x: coordinate.x - 1, y: coordinate.y }
  );
}

let sum = plots.evenInnerDiamond;
let innerDiamond = "oddInnerDiamond";
let currentMapsSize = 1;
while (currentMapsSize !== (1 + steps * 2) / map[0].length) {
  currentMapsSize += 2;
  sum +=
    (currentMapsSize - 1) * 2 * plots[innerDiamond] +
    (currentMapsSize - 1) * plots.outerDiamond;
  innerDiamond =
    innerDiamond === "oddInnerDiamond" ? "evenInnerDiamond" : "oddInnerDiamond";
}
console.log(sum);
