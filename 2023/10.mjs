const input = `
.....
.S-7.
.|.|.
.L-J.
.....
`;

// const input =`
// 7-F7-
// .FJ|7
// SJLL7
// |F--J
// LJ.LJ
// `

const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const startCoordinate = grid.flatMap((line, y) => {
  const index = line.indexOf("S");
  return index === -1 ? [] : [{ x: index, y }];
})[0];

let largestLoop = [];
for (let direction of ["north", "east", "south", "west"]) {
  let coordinate = startCoordinate;
  const potentialLoop = [];
  while (true) {
    potentialLoop.push(coordinate);
    coordinate =
      direction === "north"
        ? { x: coordinate.x, y: coordinate.y - 1 }
        : direction === "east"
        ? { x: coordinate.x + 1, y: coordinate.y }
        : direction === "south"
        ? { x: coordinate.x, y: coordinate.y + 1 }
        : direction === "west"
        ? { x: coordinate.x - 1, y: coordinate.y }
        : (() => {
            throw new Error();
          })();
    if (
      coordinate.x < 0 ||
      coordinate.x === grid[0].length ||
      coordinate.y < 0 ||
      coordinate.y === grid.length
    )
      break;

    const tile = grid[coordinate.y][coordinate.x];

    if (tile === "S") {
      if (largestLoop.length < potentialLoop.length)
        largestLoop = potentialLoop;
      break;
    } else if (tile === "|" && direction === "south") direction = "south";
    else if (tile === "|" && direction === "north") direction = "north";
    else if (tile === "-" && direction === "east") direction = "east";
    else if (tile === "-" && direction === "west") direction = "west";
    else if (tile === "L" && direction === "south") direction = "east";
    else if (tile === "L" && direction === "west") direction = "north";
    else if (tile === "J" && direction === "south") direction = "west";
    else if (tile === "J" && direction === "east") direction = "north";
    else if (tile === "7" && direction === "east") direction = "south";
    else if (tile === "7" && direction === "north") direction = "west";
    else if (tile === "F" && direction === "north") direction = "east";
    else if (tile === "F" && direction === "west") direction = "south";
    else break;
  }
}

console.log(Math.floor(largestLoop.length / 2));
console.log(largestLoop);
