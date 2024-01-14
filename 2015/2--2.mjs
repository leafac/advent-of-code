let input = `___`;

// input = `
// 2x3x4
// `;

// input = `
// 1x1x10
// `;

// input = `
// 2x3x4
// 1x1x10
// `;

console.log(
  input
    .trim()
    .split("\n")
    .reduce((sum, line) => {
      const dimensions = line
        .split("x")
        .map((dimension) => Number(dimension))
        .sort((a, b) => a - b);
      return (
        sum +
        2 * dimensions[0] +
        2 * dimensions[1] +
        dimensions[0] * dimensions[1] * dimensions[2]
      );
    }, 0)
);
