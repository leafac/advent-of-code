// const input = `
// ...#......
// .......#..
// #.........
// ..........
// ......#...
// .#........
// .........#
// ..........
// .......#..
// #...#.....
// `;

const input = `___`

const universe = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const ysToExpand = [];
const xsToExpand = [];

for (const y of universe.keys())
  if (universe[y].every((cell) => cell === ".")) ysToExpand.push(y);

for (const x of universe[0].keys()) {
  let shouldExpand = true;
  for (const y of universe.keys())
    if (universe[y][x] !== ".") shouldExpand = false;
  if (shouldExpand) xsToExpand.push(x);
}

for (const y of ysToExpand.reverse())
  universe.splice(y, 0, new Array(universe[0].length).fill("."));

for (const x of xsToExpand.reverse())
  for (const y of universe.keys()) universe[y].splice(x, 0, ".");

console.log(universe.map((line) => line.join("")).join("\n"));

const galaxiesCoordinates = [];

for (const y of universe.keys())
  for (const x of universe[y].keys())
    if (universe[y][x] === "#") galaxiesCoordinates.push({ x, y });

console.log(galaxiesCoordinates);

let distancesSum = 0;
for (const galaxyCoordinateIndexA of galaxiesCoordinates.keys())
  for (
    let galaxyCoordinateIndexB = galaxyCoordinateIndexA + 1;
    galaxyCoordinateIndexB < galaxiesCoordinates.length;
    galaxyCoordinateIndexB++
  ) {
    distancesSum +=
      Math.abs(
        galaxiesCoordinates[galaxyCoordinateIndexB].x -
          galaxiesCoordinates[galaxyCoordinateIndexA].x
      ) +
      Math.abs(
        galaxiesCoordinates[galaxyCoordinateIndexB].y -
          galaxiesCoordinates[galaxyCoordinateIndexA].y
      );
  }

console.log(distancesSum);
