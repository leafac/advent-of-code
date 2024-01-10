const input = `___`;
const numbers = input
  .split("\n")
  .filter((line) => line.trim() !== "")
  .map((numberString) => Number(numberString));

let increaseCount = 0;

for (let index = 1; index < numbers.length; index++)
  if (numbers[index] > numbers[index - 1]) increaseCount++;

console.log(increaseCount);
