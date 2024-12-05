let input = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

const [rulesString, updatesString] = input.trim().split("\n\n");
const rules = rulesString.split("\n").map((ruleLine) => {
  const [before, after] = ruleLine.split("|").map((string) => parseInt(string));
  return { before, after };
});
const updates = updatesString
  .split("\n")
  .map((updateLine) => updateLine.split(",").map((string) => parseInt(string)));
let middlePageNumbersSum = 0;
for (const update of updates) {
  let reordered = false;
  for (let beforeIndex = 0; beforeIndex < update.length; beforeIndex++)
    for (
      let afterIndex = beforeIndex + 1;
      afterIndex < update.length;
      afterIndex++
    )
      if (
        rules.some(
          (rule) =>
            rule.before === update[afterIndex] &&
            rule.after === update[beforeIndex]
        )
      ) {
        reordered = true;
        const updateBefore = update[beforeIndex];
        const updateAfter = update[afterIndex];
        update[beforeIndex] = updateAfter;
        update[afterIndex] = updateBefore;
        afterIndex = beforeIndex;
      }
  if (reordered) middlePageNumbersSum += update[(update.length - 1) / 2];
}
console.log(middlePageNumbersSum);
