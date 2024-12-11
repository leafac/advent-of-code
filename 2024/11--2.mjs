let input = `125 17`;

const stones = input.split(" ").map(Number);
const countsCache = new Map();
console.log(
  stones.reduce(
    (sum, stone) =>
      sum +
      (function count(stone, blinks) {
        const cached = countsCache.get(JSON.stringify({ stone, blinks }));
        if (cached !== undefined) return cached;
        const stoneString = String(stone);
        const answer =
          blinks === 0
            ? 1
            : stone === 0
            ? count(1, blinks - 1)
            : stoneString.length % 2 === 0
            ? count(
                Number(stoneString.slice(0, stoneString.length / 2)),
                blinks - 1
              ) +
              count(
                Number(stoneString.slice(stoneString.length / 2)),
                blinks - 1
              )
            : count(stone * 2024, blinks - 1);
        countsCache.set(JSON.stringify({ stone, blinks }), answer);
        return answer;
      })(stone, 75),
    0
  )
);
