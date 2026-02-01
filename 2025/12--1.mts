let input = ``;

const paragraphs = input.trim().split("\n\n");

const shapesString = paragraphs.slice(0, -1);

const shapes = shapesString.map((x) =>
  x
    .split("\n")
    .slice(1)
    .map((y) => y.split("")),
);
// console.log(shapes);

const regionsString = paragraphs.at(-1)!;

const regions = regionsString
  .trim()
  .split("\n")
  .map((regionString) => {
    const [regionSizeString, shapesQuantitiesString] = regionString.split(":");
    const [width, height] = regionSizeString.trim().split("x").map(Number);
    const shapesQuantities = shapesQuantitiesString
      .trim()
      .split(" ")
      .map(Number);
    return { width, height, shapesQuantities };
  });

const ratios = regions
  .map((region) => {
    let ons = 0;
    for (const [i, s] of region.shapesQuantities.entries()) {
      ons += shapes[i].flat().filter((x) => x === "#").length * s;
    }
    const r = ons / (region.height * region.width);
    if (r > 1) return;
    return r;
  })
  .filter(Boolean);

console.log(ratios.length);

// let sum = 0;
// for (const r of ratios) sum += r!;
// const mean = sum / ratios.length;
// let deltas = 0;
// for (const r of ratios) deltas += (r! - mean) ** 2;
// const standardDeviation = Math.sqrt(deltas / ratios.length);

// console.log(mean, standardDeviation);

// console.log(ratios.join("\n"));
