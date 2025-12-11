let input = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;

const ranges = input
  .trim()
  .split("\n\n")[0]
  .split("\n")
  .map((line) => line.split("-").map(BigInt));

search: while (true) {
  for (let range1Index = 0; range1Index < ranges.length; range1Index++)
    for (let range2Index = 0; range2Index < ranges.length; range2Index++) {
      if (range1Index === range2Index) continue;
      const range1 = ranges[range1Index];
      const range2 = ranges[range2Index];
      if (range1[0] <= range2[0] && range2[0] <= range1[1]) {
        if (range1[1] < range2[1]) range1[1] = range2[1];
        ranges.splice(range2Index, 1);
        continue search;
      }
    }
  break;
}

let countOfFreshIds = 0n;

for (const [start, end] of ranges) countOfFreshIds += end - start + 1n;

console.log(countOfFreshIds);
