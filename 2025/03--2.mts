let input = `
987654321111111
811111111111119
234234234234278
818181911112111
`;

const lines = input.trim().split("\n");

let count = 0n;
for (let line of lines) {
  while (12 < line.length) {
    let bestCandidate = "0";
    for (let index = 0; index < line.length; index++) {
      const candidate = line.slice(0, index) + line.slice(index + 1);
      if (BigInt(bestCandidate) < BigInt(candidate)) bestCandidate = candidate;
    }
    line = bestCandidate;
  }
  count += BigInt(line);
}
console.log(count);
