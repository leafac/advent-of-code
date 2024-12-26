let input = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
`;
let minimalSavings = 74;
let maximalCheatDistance = 20;

input = `
`;
minimalSavings = 100;
maximalCheatDistance = 20;

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let start;
let end;
for (let row = 0; row < map.length; row++)
  for (let column = 0; column < map[row].length; column++) {
    if (map[row][column] === "S") start = { row, column };
    if (map[row][column] === "E") end = { row, column };
  }

const mapPicoseconds = Array.from({ length: map.length }, () =>
  Array.from({ length: map[0].length }, () => undefined)
);
{
  let row = start.row;
  let column = start.column;
  let picoseconds = 0;
  while (true) {
    mapPicoseconds[row][column] = picoseconds;
    picoseconds++;
    if (
      map[row - 1][column] !== "#" &&
      mapPicoseconds[row - 1][column] === undefined
    )
      row--;
    else if (
      map[row][column + 1] !== "#" &&
      mapPicoseconds[row][column + 1] === undefined
    )
      column++;
    else if (
      map[row + 1][column] !== "#" &&
      mapPicoseconds[row + 1][column] === undefined
    )
      row++;
    else if (
      map[row][column - 1] !== "#" &&
      mapPicoseconds[row][column - 1] === undefined
    )
      column--;
    else break;
  }
}

let cheats = 0;
for (let row = 0; row < map.length; row++)
  for (let column = 0; column < map[row].length; column++)
    if (mapPicoseconds[row][column] !== undefined)
      for (
        let cheatRow = row - maximalCheatDistance;
        cheatRow <= row + maximalCheatDistance;
        cheatRow++
      )
        for (
          let cheatColumn = column - maximalCheatDistance;
          cheatColumn <= column + maximalCheatDistance;
          cheatColumn++
        )
          if (
            0 <= cheatRow &&
            cheatRow < map.length &&
            0 <= cheatColumn &&
            cheatColumn < map[cheatRow].length &&
            (row !== cheatRow || column !== cheatColumn) &&
            Math.abs(cheatRow - row) + Math.abs(cheatColumn - column) <=
              maximalCheatDistance &&
            mapPicoseconds[cheatRow][cheatColumn] !== undefined &&
            minimalSavings <=
              mapPicoseconds[cheatRow][cheatColumn] -
                (mapPicoseconds[row][column] +
                  Math.abs(cheatRow - row) +
                  Math.abs(cheatColumn - column))
          )
            cheats++;
console.log(cheats);
