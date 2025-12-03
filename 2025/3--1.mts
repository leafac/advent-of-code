let input = `
987654321111111
811111111111119
234234234234278
818181911112111
`;

const lines = input.trim().split("\n");

let count = 0;
for (const line of lines) {
  let firstIndex = -1;
  let firstValue = "-Infinity";
  let secondValue = "-Infinity";
  for (let i = 0; i < line.length - 1; i++) {
    if (Number(line[i]) > Number(firstValue)) {
      firstIndex = i;
      firstValue = line[i];
    }
  }
  for (let i = firstIndex + 1; i < line.length; i++) {
    if (Number(line[i]) > Number(secondValue)) {
      secondValue = line[i];
    }
  }
  count += Number(firstValue + secondValue);
}
console.log(count);
