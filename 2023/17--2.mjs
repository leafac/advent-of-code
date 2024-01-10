let input = `___`;

// input = `
// 2413432311323
// 3215453535623
// 3255245654254
// 3446585845452
// 4546657867536
// 1438598798454
// 4457876987766
// 3637877979653
// 4654967986887
// 4564679986453
// 1224686865563
// 2546548887735
// 4322674655533
// `;

// input = `
// 111111111111
// 999999999991
// 999999999991
// 999999999991
// 999999999991
// `;

// input = `
// 111111111111
// 999999999991
// 999999999991
// 999999999991
// 999999999991
// 999999999991
// 999999999991
// 999999999991
// 999999999991
// 999999999991
// 999999999991
// `;

const minimumStepsInDirection = 4;
const maximumStepsInDirection = 10;

const board = input
  .trim()
  .split("\n")
  .map((line) => line.split("").map((numberString) => Number(numberString)));

const statesToExplore = [
  {
    previousCoordinates: new Set(),
    coordinate: { x: 0, y: 0 },
    direction: undefined,
    stepsInDirection: 0,
    accumulatedHeatLoss: undefined,
  },
];
const statesExplored = new Set();
while (statesToExplore.length > 0) {
  const stateToExplore = statesToExplore.pop();
  const stateToExploreSerialized = JSON.stringify({
    coordinate: stateToExplore.coordinate,
    direction: stateToExplore.direction,
    stepsInDirection: stateToExplore.stepsInDirection,
  });
  if (statesExplored.has(stateToExploreSerialized)) continue;
  statesExplored.add(stateToExploreSerialized);
  const accumulatedHeatLoss =
    stateToExplore.accumulatedHeatLoss === undefined
      ? 0
      : stateToExplore.accumulatedHeatLoss +
        board[stateToExplore.coordinate.y][stateToExplore.coordinate.x];
  if (
    stateToExplore.coordinate.x === board[0].length - 1 &&
    stateToExplore.coordinate.y === board.length - 1 &&
    minimumStepsInDirection <= stateToExplore.stepsInDirection
  ) {
    console.log(accumulatedHeatLoss);
    break;
  }
  const previousCoordinates = new Set([
    ...stateToExplore.previousCoordinates,
    JSON.stringify(stateToExplore.coordinate),
  ]);
  for (const nextStateToExplore of [
    {
      previousCoordinates,
      coordinate: {
        x: stateToExplore.coordinate.x,
        y: stateToExplore.coordinate.y - 1,
      },
      direction: "up",
      stepsInDirection:
        stateToExplore.direction === "up"
          ? stateToExplore.stepsInDirection + 1
          : 1,
      accumulatedHeatLoss,
    },
    {
      previousCoordinates,
      coordinate: {
        x: stateToExplore.coordinate.x + 1,
        y: stateToExplore.coordinate.y,
      },
      direction: "right",
      stepsInDirection:
        stateToExplore.direction === "right"
          ? stateToExplore.stepsInDirection + 1
          : 1,
      accumulatedHeatLoss,
    },
    {
      previousCoordinates,
      coordinate: {
        x: stateToExplore.coordinate.x,
        y: stateToExplore.coordinate.y + 1,
      },
      direction: "down",
      stepsInDirection:
        stateToExplore.direction === "down"
          ? stateToExplore.stepsInDirection + 1
          : 1,
      accumulatedHeatLoss,
    },
    {
      previousCoordinates,
      coordinate: {
        x: stateToExplore.coordinate.x - 1,
        y: stateToExplore.coordinate.y,
      },
      direction: "left",
      stepsInDirection:
        stateToExplore.direction === "left"
          ? stateToExplore.stepsInDirection + 1
          : 1,
      accumulatedHeatLoss,
    },
  ])
    if (
      0 <= nextStateToExplore.coordinate.x &&
      nextStateToExplore.coordinate.x < board[0].length &&
      0 <= nextStateToExplore.coordinate.y &&
      nextStateToExplore.coordinate.y < board.length &&
      !previousCoordinates.has(JSON.stringify(nextStateToExplore.coordinate)) &&
      (stateToExplore.direction === undefined ||
        stateToExplore.direction === nextStateToExplore.direction ||
        minimumStepsInDirection <= stateToExplore.stepsInDirection) &&
      nextStateToExplore.stepsInDirection <= maximumStepsInDirection
    )
      statesToExplore.push(nextStateToExplore);
  statesToExplore.sort(
    (stateToExploreA, stateToExploreB) =>
      stateToExploreB.accumulatedHeatLoss - stateToExploreA.accumulatedHeatLoss
  );
}
