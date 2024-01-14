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

const presents = input
  .trim()
  .split("\n")
  .map((line) => {
    const [l, w, h] = line.split("x").map((dimension) => Number(dimension));
    return { l, w, h };
  });
console.log(
  presents.reduce((sum, { l, w, h }) => {
    const sidesAreas = [l * w, w * h, h * l].sort((a, b) => a - b);
    return sum + 3 * sidesAreas[0] + 2 * sidesAreas[1] + 2 * sidesAreas[2];
  }, 0)
);
