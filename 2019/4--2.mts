let input = "";

const [start, end] = input.split("-").map(Number);

let passwordCounts = 0;
for (let possiblePassword = start; possiblePassword <= end; possiblePassword++)
  if (
    String(possiblePassword).match(/(?=(.))(?<!\1)\1{2}(?!\1)/) &&
    String(possiblePassword)
      .split("")
      .map(Number)
      .every((_, index, numbers) => (numbers[index - 1] ?? 0) <= numbers[index])
  )
    passwordCounts++;
console.log(passwordCounts);
