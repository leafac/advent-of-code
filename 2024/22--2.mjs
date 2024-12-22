let input = `
1
2
3
2024
`;

// input = `123`;

const numbers = input.trim().split("\n").map(BigInt);

const prices = numbers.map((number) => [
  { number, price: number % 10n, change: undefined },
]);

const sequences = numbers.map(() => new Map());

for (let numbersIndex = 0; numbersIndex < numbers.length; numbersIndex++) {
  for (let iteration = 0; iteration < 2000; iteration++) {
    numbers[numbersIndex] =
      ((numbers[numbersIndex] * 64n) ^ numbers[numbersIndex]) % 16777216n;
    numbers[numbersIndex] =
      ((numbers[numbersIndex] / 32n) ^ numbers[numbersIndex]) % 16777216n;
    numbers[numbersIndex] =
      ((numbers[numbersIndex] * 2048n) ^ numbers[numbersIndex]) % 16777216n;
    prices[numbersIndex].push({
      number: numbers[numbersIndex],
      price: numbers[numbersIndex] % 10n,
      change: (numbers[numbersIndex] % 10n) - prices[numbersIndex].at(-1).price,
    });
  }
  for (
    let pricesIndex = 4;
    pricesIndex < prices[numbersIndex].length;
    pricesIndex++
  ) {
    const key = prices[numbersIndex]
      .slice(pricesIndex - 4 + 1, pricesIndex + 1)
      .map((price) => price.change)
      .join(",");
    if (sequences[numbersIndex].has(key)) continue;
    sequences[numbersIndex].set(key, prices[numbersIndex][pricesIndex].price);
  }
}

let maximumBananas = 0n;
for (const sequence of new Set(
  sequences.flatMap((sequences) => [...sequences.keys()])
)) {
  let bananas = 0n;
  for (let numbersIndex = 0; numbersIndex < sequences.length; numbersIndex++)
    bananas += sequences[numbersIndex].get(sequence) ?? 0n;
  if (maximumBananas < bananas) maximumBananas = bananas;
}
console.log(maximumBananas);
