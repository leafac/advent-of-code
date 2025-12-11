let input = `
`;

const matrix = input.trim().split("\n");
const operators = matrix.pop()!.trim().split(/\s+/);
const nums = matrix.map((x) => x.trim().split(/\s+/).map(Number));
const sums = [];
for (let j = 0; j < nums[0].length; j++) {
  const mul = operators[j] === "*" ? true : false;
  sums[j] = mul ? 1 : 0;
  for (let i = 0; i < nums.length; i++) {
    if (mul) sums[j] *= nums[i][j];
    else sums[j] += nums[i][j];
  }
}

let count = 0;
for (const x of sums) {
  count += x;
}
console.log(count);
