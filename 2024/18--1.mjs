let input = `
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`;
let range = 6;
let bytesCount = 12;
input = `
`;
range = 70;
bytesCount = 1024;
const bytes = input
  .trim()
  .split("\n")
  .map((line) => {
    const [columnString, rowString] = line.split(",");
    return { row: Number(rowString), column: Number(columnString) };
  });
// console.log(bytes);
const memory = Array.from({ length: range + 1 }, () =>
  Array.from({ length: range + 1 }, () => ".")
);
for (const byte of bytes.slice(0, bytesCount))
  memory[byte.row][byte.column] = "#";
// console.log(memory.map((line) => line.join("")).join("\n"));
const work = [{ row: 0, column: 0, steps: 0 }];
const visited = new Set();
while (true) {
  work.sort((a, b) => a.steps - b.steps);
  const { row, column, steps } = work.shift();
  const key = JSON.stringify({ row, column });
  if (
    row < 0 ||
    memory.length <= row ||
    column < 0 ||
    memory[row].length <= column ||
    memory[row][column] === "#" ||
    visited.has(key)
  )
    continue;
  visited.add(key);
  if (row === memory.length - 1 && column === memory[row].length - 1) {
    console.log(steps);
    break;
  }
  work.push({ row: row - 1, column, steps: steps + 1 });
  work.push({ row: row, column: column + 1, steps: steps + 1 });
  work.push({ row: row + 1, column, steps: steps + 1 });
  work.push({ row, column: column - 1, steps: steps + 1 });
}
