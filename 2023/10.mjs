// const input = `
// .....
// .S-7.
// .|.|.
// .L-J.
// .....
// `;

// const input = `
// 7-F7-
// .FJ|7
// SJLL7
// |F--J
// LJ.LJ
// `;

// const input = `
// ...........
// .S-------7.
// .|F-----7|.
// .||.....||.
// .||.....||.
// .|L-7.F-J|.
// .|..|.|..|.
// .L--J.L--J.
// ...........
// `;

const input = `___`;

const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const startCoordinate = grid.flatMap((line, y) => {
  const index = line.indexOf("S");
  return index === -1 ? [] : [{ x: index, y }];
})[0];

let largestLoop = {
  coordinates: new Set(),
  coordinatesToExploreOnRight: [],
  coordinatesToExploreOnLeft: [],
};
for (let direction of ["north", "east", "south", "west"]) {
  const coordinates = new Set();
  const coordinatesToExploreOnRight = [];
  const coordinatesToExploreOnLeft = [];
  let coordinate = startCoordinate;
  while (true) {
    coordinates.add(JSON.stringify(coordinate));

    coordinate =
      direction === "north"
        ? (coordinate = { x: coordinate.x, y: coordinate.y - 1 })
        : direction === "east"
        ? (coordinate = { x: coordinate.x + 1, y: coordinate.y })
        : direction === "south"
        ? (coordinate = { x: coordinate.x, y: coordinate.y + 1 })
        : direction === "west"
        ? (coordinate = { x: coordinate.x - 1, y: coordinate.y })
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
      if (largestLoop.coordinates.size < coordinates.size)
        largestLoop = {
          coordinates,
          coordinatesToExploreOnRight,
          coordinatesToExploreOnLeft,
        };
      break;
    } else if (tile === "|" && direction === "south") {
      direction = "south";
      coordinatesToExploreOnRight.push(
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x - 1, y: coordinate.y },
        { x: coordinate.x - 1, y: coordinate.y + 1 }
      );
      coordinatesToExploreOnLeft.push(
        { x: coordinate.x + 1, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y },
        { x: coordinate.x + 1, y: coordinate.y + 1 }
      );
    } else if (tile === "|" && direction === "north") {
      direction = "north";
      coordinatesToExploreOnRight.push(
        { x: coordinate.x + 1, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y },
        { x: coordinate.x + 1, y: coordinate.y + 1 }
      );
      coordinatesToExploreOnLeft.push(
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x - 1, y: coordinate.y },
        { x: coordinate.x - 1, y: coordinate.y + 1 }
      );
    } else if (tile === "-" && direction === "east") {
      direction = "east";
      coordinatesToExploreOnRight.push(
        { x: coordinate.x - 1, y: coordinate.y + 1 },
        { x: coordinate.x, y: coordinate.y + 1 },
        { x: coordinate.x + 1, y: coordinate.y + 1 }
      );
      coordinatesToExploreOnLeft.push(
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y - 1 }
      );
    } else if (tile === "-" && direction === "west") {
      direction = "west";
      coordinatesToExploreOnRight.push(
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y - 1 }
      );
      coordinatesToExploreOnLeft.push(
        { x: coordinate.x - 1, y: coordinate.y + 1 },
        { x: coordinate.x, y: coordinate.y + 1 },
        { x: coordinate.x + 1, y: coordinate.y + 1 }
      );
    } else if (tile === "L" && direction === "south") {
      direction = "east";
      coordinatesToExploreOnRight.push(
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x - 1, y: coordinate.y },
        { x: coordinate.x - 1, y: coordinate.y + 1 },
        { x: coordinate.x, y: coordinate.y + 1 },
        { x: coordinate.x + 1, y: coordinate.y + 1 }
      );
      coordinatesToExploreOnLeft.push({
        x: coordinate.x + 1,
        y: coordinate.y - 1,
      });
    } else if (tile === "L" && direction === "west") {
      direction = "north";
      coordinatesToExploreOnRight.push({
        x: coordinate.x + 1,
        y: coordinate.y - 1,
      });
      coordinatesToExploreOnLeft.push(
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x - 1, y: coordinate.y },
        { x: coordinate.x - 1, y: coordinate.y + 1 },
        { x: coordinate.x, y: coordinate.y + 1 },
        { x: coordinate.x + 1, y: coordinate.y + 1 }
      );
    } else if (tile === "J" && direction === "south") {
      direction = "west";
      coordinatesToExploreOnRight.push({
        x: coordinate.x - 1,
        y: coordinate.y - 1,
      });
      coordinatesToExploreOnLeft.push(
        { x: coordinate.x + 1, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y },
        { x: coordinate.x + 1, y: coordinate.y + 1 },
        { x: coordinate.x, y: coordinate.y + 1 },
        { x: coordinate.x - 1, y: coordinate.y + 1 }
      );
    } else if (tile === "J" && direction === "east") {
      direction = "north";
      coordinatesToExploreOnRight.push(
        { x: coordinate.x + 1, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y },
        { x: coordinate.x + 1, y: coordinate.y + 1 },
        { x: coordinate.x, y: coordinate.y + 1 },
        { x: coordinate.x - 1, y: coordinate.y + 1 }
      );
      coordinatesToExploreOnLeft.push({
        x: coordinate.x - 1,
        y: coordinate.y - 1,
      });
    } else if (tile === "7" && direction === "east") {
      direction = "south";
      coordinatesToExploreOnRight.push({
        x: coordinate.x - 1,
        y: coordinate.y + 1,
      });
      coordinatesToExploreOnLeft.push(
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y },
        { x: coordinate.x + 1, y: coordinate.y + 1 }
      );
    } else if (tile === "7" && direction === "north") {
      direction = "west";
      coordinatesToExploreOnRight.push(
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y },
        { x: coordinate.x + 1, y: coordinate.y + 1 }
      );
      coordinatesToExploreOnLeft.push({
        x: coordinate.x - 1,
        y: coordinate.y + 1,
      });
    } else if (tile === "F" && direction === "north") {
      direction = "east";
      coordinatesToExploreOnRight.push({
        x: coordinate.x + 1,
        y: coordinate.y + 1,
      });
      coordinatesToExploreOnLeft.push(
        { x: coordinate.x - 1, y: coordinate.y + 1 },
        { x: coordinate.x - 1, y: coordinate.y },
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y - 1 }
      );
    } else if (tile === "F" && direction === "west") {
      direction = "south";
      coordinatesToExploreOnRight.push(
        { x: coordinate.x - 1, y: coordinate.y + 1 },
        { x: coordinate.x - 1, y: coordinate.y },
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y - 1 }
      );
      coordinatesToExploreOnLeft.push({
        x: coordinate.x + 1,
        y: coordinate.y + 1,
      });
    } else break;
  }
}

console.log(largestLoop);
console.log(Math.floor(largestLoop.coordinates.size / 2));

let insideCoordinates;
for (const coordinatesToExplore of [
  largestLoop.coordinatesToExploreOnRight,
  largestLoop.coordinatesToExploreOnLeft,
]) {
  insideCoordinates = new Set();
  while (coordinatesToExplore.length > 0) {
    const coordinate = coordinatesToExplore.pop();
    if (
      coordinate.x < 0 ||
      coordinate.x === grid[0].length ||
      coordinate.y < 0 ||
      coordinate.y === grid.length
    ) {
      insideCoordinates = undefined;
      break;
    }
    if (
      largestLoop.coordinates.has(JSON.stringify(coordinate)) ||
      insideCoordinates.has(JSON.stringify(coordinate))
    )
      continue;
    insideCoordinates.add(JSON.stringify(coordinate));
    coordinatesToExplore.push(
      { x: coordinate.x, y: coordinate.y - 1 },
      { x: coordinate.x + 1, y: coordinate.y - 1 },
      { x: coordinate.x + 1, y: coordinate.y },
      { x: coordinate.x + 1, y: coordinate.y + 1 },
      { x: coordinate.x, y: coordinate.y + 1 },
      { x: coordinate.x - 1, y: coordinate.y + 1 },
      { x: coordinate.x - 1, y: coordinate.y }
    );
  }
  if (insideCoordinates !== undefined) break;
}

console.log(insideCoordinates);
console.log(insideCoordinates.size);
