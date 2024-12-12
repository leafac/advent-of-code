let input = `
AAAA
BBCD
BBCC
EEEC
`;
// 80

input = `
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
`;
// 436

input = `
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE
`;
// 236

input = `
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA
`;
// 368

input = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`;
// 1206

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));
const visited = map.map((line) => line.map(() => "."));
let totalPrice = 0;
for (let row = 0; row < map.length; row++)
  for (let column = 0; column < map[row].length; column++) {
    if (visited[row][column] === "#") continue;
    const typeOfPlant = map[row][column];
    let area = 0;
    let regionMap = map.map((line) => line.map(() => "."));
    (function floodFill(row, column) {
      if (
        row < 0 ||
        map.length <= row ||
        column < 0 ||
        map[row].length <= column ||
        map[row][column] !== typeOfPlant ||
        visited[row][column] === "#"
      )
        return;
      visited[row][column] = "#";
      regionMap[row][column] = "#";
      area++;
      floodFill(row - 1, column);
      floodFill(row, column + 1);
      floodFill(row + 1, column);
      floodFill(row, column - 1);
    })(row, column);
    let sides = 0;
    {
      let inSide;
      for (let row = 0; row < regionMap.length; row++) {
        inSide = false;
        for (let column = 0; column < regionMap[row].length; column++)
          if (
            regionMap[row][column] === "#" &&
            (row - 1 < 0 || regionMap[row - 1][column] === ".")
          ) {
            if (!inSide) sides++;
            inSide = true;
          } else inSide = false;
      }
    }
    {
      let inSide;
      for (let column = 0; column < regionMap[row].length; column++) {
        inSide = false;
        for (let row = 0; row < regionMap.length; row++)
          if (
            regionMap[row][column] === "#" &&
            (regionMap[row].length <= column + 1 ||
              regionMap[row][column + 1] === ".")
          ) {
            if (!inSide) sides++;
            inSide = true;
          } else inSide = false;
      }
    }
    {
      let inSide;
      for (let row = 0; row < regionMap.length; row++) {
        inSide = false;
        for (let column = 0; column < regionMap[row].length; column++)
          if (
            regionMap[row][column] === "#" &&
            (regionMap.length <= row + 1 || regionMap[row + 1][column] === ".")
          ) {
            if (!inSide) sides++;
            inSide = true;
          } else inSide = false;
      }
    }
    {
      let inSide;
      for (let column = 0; column < regionMap[row].length; column++) {
        inSide = false;
        for (let row = 0; row < regionMap.length; row++)
          if (
            regionMap[row][column] === "#" &&
            (column - 1 < 0 || regionMap[row][column - 1] === ".")
          ) {
            if (!inSide) sides++;
            inSide = true;
          } else inSide = false;
      }
    }
    totalPrice += area * sides;
  }
console.log(totalPrice);
