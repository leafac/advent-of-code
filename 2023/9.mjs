// #region Example input
const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

// #region part 1
// let sum = 0;
// for (const line of input.split("\n").filter((line) => line.trim() !== "")) {
//   let numbers = line
//     .trim()
//     .split(" ")
//     .map((numberString) => Number(numberString));
//   sum += numbers.at(-1);
//   while (!numbers.every((number) => number === 0)) {
//     const newNumbers = [];
//     for (let numberIndex = 1; numberIndex < numbers.length; numberIndex++)
//       newNumbers.push(numbers[numberIndex] - numbers[numberIndex - 1]);
//     sum += newNumbers.at(-1);
//     numbers = newNumbers;
//   }
// }
// console.log(sum);

// #region part 2
let sum = 0;
for (const line of input.split("\n").filter((line) => line.trim() !== "")) {
  let numbers = line
    .trim()
    .split(" ")
    .map((numberString) => Number(numberString));
  sum += numbers[0];
  let shouldSubtract = true;
  while (!numbers.every((number) => number === 0)) {
    const newNumbers = [];
    for (let numberIndex = 1; numberIndex < numbers.length; numberIndex++)
      newNumbers.push(numbers[numberIndex] - numbers[numberIndex - 1]);
    sum += shouldSubtract ? -newNumbers[0] : newNumbers[0];
    shouldSubtract = !shouldSubtract;
    numbers = newNumbers;
  }
}
console.log(sum);
