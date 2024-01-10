const input = `___`;

// const input = `
// ?###???????? 3,2,1
// `;

console.log(
  input
    .trim()
    .split("\n")
    .map((line) => {
      const [springs, sizesString] = line.split(" ");
      const sizes = sizesString.split(",").map((size) => Number(size));
      return traverse(springs, sizes, ".");
      function traverse(springs, sizes, previousSpring) {
        return springs.length === 0
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
      }
    })
    .reduce((a, b) => a + b)
);
