let input = `___`;

// input = `
// #.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.

// #...##..#
// #....#..#
// ..##..###
// #####.##.
// #####.##.
// ..##..###
// #....#..#
// `;

let sum = 0;

// board[0].length == 9
// 012345678
//     ><
// #.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.
//     ><
// 012345678

boardsExploration: for (const board of input
  .trim()
  .split("\n\n")
  .map((boardString) =>
    boardString.split("\n").map((boardStringLine) => boardStringLine.split(""))
  )) {
  verticalReflectionSearch: for (
    let xReflection = 1;
    xReflection < board[0].length;
    xReflection++
  ) {
    for (
      let xReflectionOffset = 0;
      xReflectionOffset < Math.min(xReflection, board[0].length - xReflection);
      xReflectionOffset++
    )
      for (let y = 0; y < board.length; y++)
        if (
          board[y][xReflection + xReflectionOffset] !==
          board[y][xReflection - xReflectionOffset - 1]
        )
          continue verticalReflectionSearch;
    sum += xReflection;
    continue boardsExploration;
  }
  horizontalReflectionSearch: for (
    let yReflection = 1;
    yReflection < board.length;
    yReflection++
  ) {
    for (
      let yReflectionOffset = 0;
      yReflectionOffset < Math.min(yReflection, board.length - yReflection);
      yReflectionOffset++
    )
      for (let x = 0; x < board[0].length; x++)
        if (
          board[yReflection + yReflectionOffset][x] !==
          board[yReflection - yReflectionOffset - 1][x]
        )
          continue horizontalReflectionSearch;
    sum += yReflection * 100;
    continue boardsExploration;
  }
}

console.log(sum);
