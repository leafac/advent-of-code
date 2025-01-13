let input = ``;

let width = 25;
let height = 6;

// width = 2;
// height = 2;

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

const finalImage = Array.from({ length: image[0].length }, () =>
  Array.from({ length: image[0][0].length }, () => "")
);

for (let row = 0; row < finalImage.length; row++)
  for (let column = 0; column < finalImage[0].length; column++)
    for (const layer of image) {
      if (layer[row][column] === 2) continue;
      else if (layer[row][column] === 0) finalImage[row][column] = "█";
      else if (layer[row][column] === 1) finalImage[row][column] = " ";
      else throw new Error();
      break;
    }

console.log(finalImage.map((line) => line.join("")).join("\n"));
