let input = "";

const [start, end] = input.split("-").map(Number);

let passwordCounts = 0;
const repeatedDigitsRegex = new RegExp(
  Array.from(
    { length: 10 },
    (_, digit) => `(([^${digit}]|^)${digit}${digit}([^${digit}]|$))`
  ).join("|")
);
for (let possiblePassword = start; possiblePassword <= end; possiblePassword++)
  if (
    String(possiblePassword).match(repeatedDigitsRegex) &&
    String(possiblePassword)
      .split("")
      .map(Number)
      .every((_, index, numbers) => (numbers[index - 1] ?? 0) <= numbers[index])
  )
    passwordCounts++;
console.log(passwordCounts);
