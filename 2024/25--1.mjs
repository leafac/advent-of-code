let input = `
#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####
`;

const locks = [];
const keys = [];
for (const schematic of input
  .trim()
  .split("\n\n")
  .map((schematicString) =>
    schematicString.split("\n").map((line) => line.split(""))
  ))
  if (schematic[0][0] === "#") {
    const lock = [];
    for (let column = 0; column < schematic[0].length; column++)
      for (let height = 0; ; height++)
        if (schematic[1 + height][column] === ".") {
          lock.push(height);
          break;
        }
    locks.push(lock);
  } else if (schematic[schematic.length - 1][0] === "#") {
    const key = [];
    for (let column = 0; column < schematic[0].length; column++)
      for (let height = 0; ; height++)
        if (schematic[schematic.length - 2 - height][column] === ".") {
          key.push(height);
          break;
        }
    keys.push(key);
  }
let fits = 0;
for (const lock of locks)
  search: for (const key of keys) {
    for (let index = 0; index < lock.length; index++)
      if (5 < lock[index] + key[index]) continue search;
    fits++;
  }
console.log(fits);
