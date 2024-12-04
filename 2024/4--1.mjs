let input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

const word = "XMAS";
const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));
let occurrences = 0;
for (let row = 0; row < grid.length; row++)
  for (let column = 0; column < grid[row].length; column++) {
    search: {
      for (let wordIndex = 0; wordIndex < word.length; wordIndex++)
        if (
          grid[row].length <= column + wordIndex ||
          grid[row][column + wordIndex] !== word[wordIndex]
        )
          break search;
      occurrences++;
    }
    search: {
      for (let wordIndex = 0; wordIndex < word.length; wordIndex++)
        if (
          column - wordIndex < 0 ||
          grid[row][column - wordIndex] !== word[wordIndex]
        )
          break search;
      occurrences++;
    }
    search: {
      for (let wordIndex = 0; wordIndex < word.length; wordIndex++)
        if (
          grid.length <= row + wordIndex ||
          grid[row + wordIndex][column] !== word[wordIndex]
        )
          break search;
      occurrences++;
    }
    search: {
      for (let wordIndex = 0; wordIndex < word.length; wordIndex++)
        if (
          row - wordIndex < 0 ||
          grid[row - wordIndex][column] !== word[wordIndex]
        )
          break search;
      occurrences++;
    }
    search: {
      for (let wordIndex = 0; wordIndex < word.length; wordIndex++)
        if (
          grid[row].length <= column + wordIndex ||
          grid.length <= row + wordIndex ||
          grid[row + wordIndex][column + wordIndex] !== word[wordIndex]
        )
          break search;
      occurrences++;
    }
    search: {
      for (let wordIndex = 0; wordIndex < word.length; wordIndex++)
        if (
          column - wordIndex < 0 ||
          row - wordIndex < 0 ||
          grid[row - wordIndex][column - wordIndex] !== word[wordIndex]
        )
          break search;
      occurrences++;
    }
    search: {
      for (let wordIndex = 0; wordIndex < word.length; wordIndex++)
        if (
          column - wordIndex < 0 ||
          grid.length <= row + wordIndex ||
          grid[row + wordIndex][column - wordIndex] !== word[wordIndex]
        )
          break search;
      occurrences++;
    }
    search: {
      for (let wordIndex = 0; wordIndex < word.length; wordIndex++)
        if (
          grid[row].length <= column + wordIndex ||
          row - wordIndex < 0 ||
          grid[row - wordIndex][column + wordIndex] !== word[wordIndex]
        )
          break search;
      occurrences++;
    }
  }
console.log(occurrences);
