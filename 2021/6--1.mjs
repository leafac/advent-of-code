let input = `3,4,3,1,2`;
let days = 80;
const lanternfishes = input.split(",").map(Number);
let count = 0;
for (const lanternfish of lanternfishes)
  count += (function step(lanternfish, days) {
    return days === 0
      ? 1
      : lanternfish === 0
      ? step(6, days - 1) + step(8, days - 1)
      : step(lanternfish - 1, days - 1);
  })(lanternfish, days);
console.log(count);
