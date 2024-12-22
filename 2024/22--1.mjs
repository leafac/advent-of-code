let input = `
1
10
100
2024
`;

const numbers = input.trim().split("\n").map(BigInt);

for (let iteration = 0; iteration < 2000; iteration++)
  for (let numbersIndex = 0; numbersIndex < numbers.length; numbersIndex++) {
    numbers[numbersIndex] =
      ((numbers[numbersIndex] * 64n) ^ numbers[numbersIndex]) % 16777216n;
    numbers[numbersIndex] =
      ((numbers[numbersIndex] / 32n) ^ numbers[numbersIndex]) % 16777216n;
    numbers[numbersIndex] =
      ((numbers[numbersIndex] * 2048n) ^ numbers[numbersIndex]) % 16777216n;
  }

console.log(numbers.reduce((a, b) => a + b, 0n));
