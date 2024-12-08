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
      for (
        let antinodeRow = antennasPositions[antennaPositionIndex1].row,
          antinodeColumn = antennasPositions[antennaPositionIndex1].column;
        0 <= antinodeRow &&
        antinodeRow < antinodesMap.length &&
        0 <= antinodeColumn &&
        antinodeColumn < antinodesMap[0].length;
        antinodeRow += rowDifference, antinodeColumn += columnDifference
      )
        antinodesMap[antinodeRow][antinodeColumn] = "#";
      for (
        let antinodeRow = antennasPositions[antennaPositionIndex1].row,
          antinodeColumn = antennasPositions[antennaPositionIndex1].column;
        0 <= antinodeRow &&
        antinodeRow < antinodesMap.length &&
        0 <= antinodeColumn &&
        antinodeColumn < antinodesMap[0].length;
        antinodeRow -= rowDifference, antinodeColumn -= columnDifference
      )
        antinodesMap[antinodeRow][antinodeColumn] = "#";
    }
let antinodesCount = 0;
for (let row = 0; row < antinodesMap.length; row++)
  for (let column = 0; column < antinodesMap[0].length; column++)
    if (antinodesMap[row][column] === "#") antinodesCount++;
console.log(antinodesCount);
