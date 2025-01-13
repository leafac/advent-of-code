let input = ``;

let width = 25;
let height = 6;

function count<T>(arr: T[][], digit: T) {
  let count = 0;
  for (const row of arr) count += row.filter((x) => x === digit).length;
  return count;
}

type Layer = Array<Array<number>>;

const image: Array<Layer> = [];
while (input.length > 0) {
  const layer: Layer = [];
  for (let i = 0; i < height; i++) {
    const part = input.slice(0, width);
    input = input.slice(width);
    layer.push(part.split("").map(Number));
  }
  image.push(layer);
}

let minZeros = Infinity;
let minLayer: Layer = [];
for (const layer of image) {
  const zeros = count(layer, 0);
  if (zeros < minZeros) {
    minZeros = zeros;
    minLayer = layer;
  }
}

console.log(count(minLayer, 1) * count(minLayer, 2)); // 1935
