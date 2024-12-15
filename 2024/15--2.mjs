let input = `
##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
`;
// 9021

// input = `
// #######
// #...#.#
// #.....#
// #..OO@#
// #..O..#
// #.....#
// #######

// <vv<<^^<<^^
// `;

const [warehouseString, movesString] = input.trim().split("\n\n");
const warehouse = warehouseString
  .replaceAll("#", "##")
  .replaceAll("O", "[]")
  .replaceAll(".", "..")
  .replaceAll("@", "@.")
  .split("\n")
  .map((line) => line.split(""));
const moves = movesString.replaceAll("\n", "").split("");
// console.log(warehouse.map((line) => line.join("")).join("\n"));
// console.log(moves);
let robot;
robot: for (let row = 0; row < warehouse.length; row++)
  for (let column = 0; column < warehouse[row].length; column++)
    if (warehouse[row][column] === "@") {
      robot = { row, column };
      break robot;
    }
move: for (const move of moves) {
  // console.log(warehouse.map((line) => line.join("")).join("\n"));
  // console.log(`\nMove ${move}:`);
  const toConsider = [{ row: robot.row, column: robot.column }];
  const toMove = [];
  while (0 < toConsider.length) {
    const { row, column } = toConsider.shift();
    if (toMove.some((toMove) => toMove.row === row && toMove.column === column))
      continue;
    toMove.unshift({ row, column });
    if (move === "^") {
      if (warehouse[row - 1][column] === "#") continue move;
      else if (warehouse[row - 1][column] === "[")
        toConsider.push(
          { row: row - 1, column },
          { row: row - 1, column: column + 1 }
        );
      else if (warehouse[row - 1][column] === "]")
        toConsider.push(
          { row: row - 1, column: column - 1 },
          { row: row - 1, column }
        );
    } else if (move === ">") {
      if (warehouse[row][column + 1] === "#") continue move;
      else if (
        warehouse[row][column + 1] === "[" ||
        warehouse[row][column + 1] === "]"
      )
        toConsider.push({ row, column: column + 1 });
    } else if (move === "v") {
      if (warehouse[row + 1][column] === "#") continue move;
      else if (warehouse[row + 1][column] === "[")
        toConsider.push(
          { row: row + 1, column },
          { row: row + 1, column: column + 1 }
        );
      else if (warehouse[row + 1][column] === "]")
        toConsider.push(
          { row: row + 1, column: column - 1 },
          { row: row + 1, column }
        );
    } else if (move === "<") {
      if (warehouse[row][column - 1] === "#") continue move;
      else if (
        warehouse[row][column - 1] === "]" ||
        warehouse[row][column - 1] === "["
      )
        toConsider.push({ row, column: column - 1 });
    }
  }
  if (move === "^") {
    for (const { row, column } of toMove) {
      warehouse[row - 1][column] = warehouse[row][column];
      warehouse[row][column] = ".";
    }
    robot.row--;
  } else if (move === ">") {
    for (const { row, column } of toMove) {
      warehouse[row][column + 1] = warehouse[row][column];
      warehouse[row][column] = ".";
    }
    robot.column++;
  } else if (move === "v") {
    for (const { row, column } of toMove) {
      warehouse[row + 1][column] = warehouse[row][column];
      warehouse[row][column] = ".";
    }
    robot.row++;
  } else if (move === "<") {
    for (const { row, column } of toMove) {
      warehouse[row][column - 1] = warehouse[row][column];
      warehouse[row][column] = ".";
    }
    robot.column--;
  }
}
// console.log(warehouse.map((line) => line.join("")).join("\n"));
let sumOfGPSCoordinates = 0;
for (let row = 0; row < warehouse.length; row++)
  for (let column = 0; column < warehouse[row].length; column++)
    if (warehouse[row][column] === "[")
      sumOfGPSCoordinates += 100 * row + column;
console.log(sumOfGPSCoordinates);
