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
// 10092

input = `
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<
`;
// 2028

const [warehouseString, movesString] = input.trim().split("\n\n");
const warehouse = warehouseString.split("\n").map((line) => line.split(""));
const moves = movesString.replaceAll("\n", "").split("");
let robot;
robot: for (let row = 0; row < warehouse.length; row++)
  for (let column = 0; column < warehouse[row].length; column++)
    if (warehouse[row][column] === "@") {
      robot = { row, column };
      break robot;
    }
move: for (const move of moves)
  if (move === "^") {
    let row = robot.row;
    while (true) {
      row--;
      if (warehouse[row][robot.column] === "#") continue move;
      if (warehouse[row][robot.column] === ".") break;
      if (warehouse[row][robot.column] === "O") continue;
    }
    while (row < robot.row) {
      warehouse[row][robot.column] = "O";
      row++;
    }
    warehouse[robot.row - 1][robot.column] = "@";
    warehouse[robot.row][robot.column] = ".";
    robot.row--;
  } else if (move === ">") {
    let column = robot.column;
    while (true) {
      column++;
      if (warehouse[robot.row][column] === "#") continue move;
      if (warehouse[robot.row][column] === ".") break;
      if (warehouse[robot.row][column] === "O") continue;
    }
    while (robot.column < column) {
      warehouse[robot.row][column] = "O";
      column--;
    }
    warehouse[robot.row][robot.column + 1] = "@";
    warehouse[robot.row][robot.column] = ".";
    robot.column++;
  } else if (move === "v") {
    let row = robot.row;
    while (true) {
      row++;
      if (warehouse[row][robot.column] === "#") continue move;
      if (warehouse[row][robot.column] === ".") break;
      if (warehouse[row][robot.column] === "O") continue;
    }
    while (robot.row < row) {
      warehouse[row][robot.column] = "O";
      row--;
    }
    warehouse[robot.row + 1][robot.column] = "@";
    warehouse[robot.row][robot.column] = ".";
    robot.row++;
  } else if (move === "<") {
    let column = robot.column;
    while (true) {
      column--;
      if (warehouse[robot.row][column] === "#") continue move;
      if (warehouse[robot.row][column] === ".") break;
      if (warehouse[robot.row][column] === "O") continue;
    }
    while (column < robot.column) {
      warehouse[robot.row][column] = "O";
      column++;
    }
    warehouse[robot.row][robot.column - 1] = "@";
    warehouse[robot.row][robot.column] = ".";
    robot.column--;
  }
// console.log(warehouse.map((line) => line.join("")).join("\n"));
let sumOfGPSCoordinates = 0;
for (let row = 0; row < warehouse.length; row++)
  for (let column = 0; column < warehouse[row].length; column++)
    if (warehouse[row][column] === "O")
      sumOfGPSCoordinates += 100 * row + column;
console.log(sumOfGPSCoordinates);
