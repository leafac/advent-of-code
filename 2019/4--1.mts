let passwordCounts = 0;
for (let possiblePassword = ___; possiblePassword <= ___; possiblePassword++)
  if (
    String(possiblePassword).match(/([0-9])\1/) &&
    String(possiblePassword)
      .split("")
      .map(Number)
      .every((_, index, numbers) => (numbers[index - 1] ?? 0) <= numbers[index])
  )
    passwordCounts++;
console.log(passwordCounts);
