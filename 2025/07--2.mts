let input = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`;

// * split the entire grid
// * count all the split points multiply
// * which splitters a particle is able to reach?

// paths = recurse(left) + recurse(right)
// recurse([r,c]) => if [r,c] in set -> return cache[[r,c]]

// am I a beam?
// is there a beam below + 1 + recurse to the beam below
// is there empty space below return
// is there a splitter below recurse_left + recurse_right

// ---
// convert all 0 -> 0, S -> 1
// if above me is number -> += ...
// if upper left is a number => += ...
// if upper right is a number => += ...
//  sum the last line

/*
000000010000000
000000010000000
0000001^1000000
000000X0Y000000
000000^2^000000
000000000000000
00000^0^0^00000
000000000000000
0000^0^000^0000
000000000000000
000^0^000^0^000
000000000000000
00^000^00000^00
000000000000000
0^0^0^0^0^000^0
000000000000000
*/

const grid = input
  .trim()
  .replace("S", "1")
  .split("\n")
  .map((line) => line.trim().split(""));

for (let row = 1; row < grid.length; row++)
  for (let column = 0; column < grid[0].length; column++) {
    if (grid[row][column] !== ".") continue;
    const upperLeft =
      grid[row][column - 1] === "^" ? grid[row - 1][column - 1] : 0;
    const upper = grid[row - 1][column];
    const upperRight =
      grid[row][column + 1] === "^" ? grid[row - 1][column + 1] : 0;
    const sum = [upperLeft, upper, upperRight]
      .map((x) => Number(x))
      .filter((x) => !isNaN(x))
      .reduce((acc, cur) => acc + cur, 0);
    grid[row][column] = String(sum);
  }

// console.log(grid.map((line) => line.join("")).join("\n"));
console.log(grid.at(-1)!.reduce((acc, cur) => acc + Number(cur), 0));
