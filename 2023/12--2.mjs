let input = `___`;

// input = `
// ???.### 1,1,3
// .??..??...?##. 1,1,3
// ?#?#?#?#?#?#?#? 1,3,1,6
// ????.#...#... 4,1,1
// ????.######..#####. 1,6,5
// ?###???????? 3,2,1
// `;

// const workers = workerpool.pool();

const cache = new Map();

console.log(
  input
    .trim()
    .split("\n")
    .map((line) => {
      let [springs, sizesString] = line.split(" ");
      springs = new Array(5).fill(springs).join("?");
      sizesString = new Array(5).fill(sizesString).join(",");
      const sizes = sizesString.split(",").map((size) => Number(size));
      const arrangements = traverse(springs, sizes, ".");
      return arrangements;
      function traverse(springs, sizes, previousSpring) {
        const cacheKey = JSON.stringify([springs, sizes, previousSpring]);
        if (cache.has(cacheKey)) return cache.get(cacheKey);
        const arrangements =
          springs.length === 0
            ? sizes.length === 0 || (sizes.length === 1 && sizes[0] === 0)
              ? 1
              : 0
            : springs[0] === "?"
            ? traverse("." + springs.slice(1), sizes, previousSpring) +
              traverse("#" + springs.slice(1), sizes, previousSpring)
            : previousSpring === "." && springs[0] === "."
            ? traverse(springs.slice(1), sizes, springs[0])
            : springs[0] === "#"
            ? sizes.length > 0 && sizes[0] > 0
              ? traverse(
                  springs.slice(1),
                  [sizes[0] - 1, ...sizes.slice(1)],
                  springs[0]
                )
              : 0
            : previousSpring === "#" && springs[0] === "."
            ? sizes.length > 0 && sizes[0] === 0
              ? traverse(springs.slice(1), sizes.slice(1), springs[0])
              : 0
            : 0;
        cache.set(cacheKey, arrangements);
        return arrangements;
      }
    })
    .reduce((a, b) => a + b)
);
