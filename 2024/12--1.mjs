let input = `
AAAA
BBCD
BBCC
EEEC
`;

input = `
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
`;

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
    let perimeter = 0;
    (function floodFill(row, column) {
      if (
        row < 0 ||
        map.length <= row ||
        column < 0 ||
        map[row].length <= column ||
        map[row][column] !== typeOfPlant
      ) {
        perimeter++;
        return;
      }
      if (visited[row][column] === "#") return;
      visited[row][column] = "#";
      area++;
      floodFill(row - 1, column);
      floodFill(row, column + 1);
      floodFill(row + 1, column);
      floodFill(row, column - 1);
    })(row, column);
    totalPrice += area * perimeter;
  }
console.log(totalPrice);
