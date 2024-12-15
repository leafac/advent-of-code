let input = `3,4,3,1,2`;
let days = 256;
const lanternfishes = input.split(",").map(Number);
let count = 0;
const cache = new Map();
for (const lanternfish of lanternfishes)
  count += (function step(lanternfish, days) {
    const key = JSON.stringify({ lanternfish, days });
    let answer = cache.get(key);
    if (answer !== undefined) return answer;
    answer =
      days === 0
        ? 1
        : lanternfish === 0
        ? step(6, days - 1) + step(8, days - 1)
        : step(lanternfish - 1, days - 1);
    cache.set(key, answer);
    return answer;
  })(lanternfish, days);
console.log(count);
