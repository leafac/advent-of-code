let input = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));
const antennas = new Map();
for (let row = 0; row < map.length; row++)
  for (let column = 0; column < map[0].length; column++)
    if (map[row][column] !== ".")
      antennas.get(map[row][column])?.push({ row, column }) ??
        antennas.set(map[row][column], [{ row, column }]);
const antinodesMap = Array.from({ length: map.length }, () =>
  Array.from({ length: map[0].length }, () => ".")
);
for (const antennasPositions of antennas.values())
  for (
    let antennaPositionIndex1 = 0;
    antennaPositionIndex1 < antennasPositions.length;
    antennaPositionIndex1++
  )
    for (
      let antennaPositionIndex2 = antennaPositionIndex1 + 1;
      antennaPositionIndex2 < antennasPositions.length;
      antennaPositionIndex2++
    ) {
      const rowDifference =
        antennasPositions[antennaPositionIndex2].row -
        antennasPositions[antennaPositionIndex1].row;
      const columnDifference =
        antennasPositions[antennaPositionIndex2].column -
        antennasPositions[antennaPositionIndex1].column;
      for (const antinodePosition of [
        {
          row: antennasPositions[antennaPositionIndex1].row - rowDifference,
          column:
            antennasPositions[antennaPositionIndex1].column - columnDifference,
        },
        {
          row: antennasPositions[antennaPositionIndex2].row + rowDifference,
          column:
            antennasPositions[antennaPositionIndex2].column + columnDifference,
        },
      ])
        if (
          0 <= antinodePosition.row &&
          antinodePosition.row < antinodesMap.length &&
          0 <= antinodePosition.column &&
          antinodePosition.column < antinodesMap[0].length
        )
          antinodesMap[antinodePosition.row][antinodePosition.column] = "#";
    }
let antinodesCount = 0;
for (let row = 0; row < antinodesMap.length; row++)
  for (let column = 0; column < antinodesMap[0].length; column++)
    if (antinodesMap[row][column] === "#") antinodesCount++;
console.log(antinodesCount);
