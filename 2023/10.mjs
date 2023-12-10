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

let largestLoop = {
  coordinates: [],
  coordinatesToExploreOnRight: [],
  coordinatesToExploreOnLeft: [],
};
for (let direction of ["north", "east", "south", "west"]) {
  const coordinates = [];
  const coordinatesToExploreOnRight = [];
  const coordinatesToExploreOnLeft = [];
  let coordinate = startCoordinate;
  while (true) {
    coordinates.push(coordinate);
    if (direction === "north") {
      coordinate = {
        x: coordinate.x,
        y: coordinate.y - 1,
      };
      coordinatesToExploreOnRight.push({
        x: coordinate.x + 1,
        y: coordinate.y,
      });
      coordinatesToExploreOnLeft.push({
        x: coordinate.x - 1,
        y: coordinate.y,
      });
    } else if (direction === "east") {
      coordinate = {
        x: coordinate.x + 1,
        y: coordinate.y,
      };
      coordinatesToExploreOnRight.push({
        x: coordinate.x,
        y: coordinate.y + 1,
      });
      coordinatesToExploreOnLeft.push({
        x: coordinate.x,
        y: coordinate.y - 1,
      });
    } else if (direction === "south") {
      coordinate = {
        x: coordinate.x,
        y: coordinate.y + 1,
      };
      coordinatesToExploreOnRight.push({
        x: coordinate.x - 1,
        y: coordinate.y,
      });
      coordinatesToExploreOnLeft.push({
        x: coordinate.x + 1,
        y: coordinate.y,
      });
    } else if (direction === "west") {
      coordinate = {
        x: coordinate.x - 1,
        y: coordinate.y,
      };
      coordinatesToExploreOnRight.push({
        x: coordinate.x,
        y: coordinate.y - 1,
      });
      coordinatesToExploreOnLeft.push({
        x: coordinate.x,
        y: coordinate.y + 1,
      });
    }

    if (
      coordinate.x < 0 ||
      coordinate.x === grid[0].length ||
      coordinate.y < 0 ||
      coordinate.y === grid.length
    )
      break;

    const tile = grid[coordinate.y][coordinate.x];

    if (tile === "S") {
      if (largestLoop.coordinates.length < coordinates.length)
        largestLoop = {
          coordinates,
          coordinatesToExploreOnRight,
          coordinatesToExploreOnLeft,
        };
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

console.log(Math.floor(largestLoop.coordinates.length / 2));
console.log(largestLoop);
