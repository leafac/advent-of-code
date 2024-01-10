let input = `___`;

// input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const boxes = [];
for (let boxIndex = 0; boxIndex < 256; boxIndex++) boxes.push([]);

for (const step of input.split(",")) {
  const [label, focalLength] = step.split(/[=-]/);
  const boxIndex = label
    .split("")
    .reduce(
      (hash, character) => ((hash + character.charCodeAt()) * 17) % 256,
      0
    );
  const existingLensIndex = boxes[boxIndex].findIndex(
    (lens) => lens.label === label
  );
  if (focalLength !== "") {
    const lens = { label, focalLength: Number(focalLength) };
    if (existingLensIndex > -1) boxes[boxIndex][existingLensIndex] = lens;
    else boxes[boxIndex].push(lens);
  } else if (existingLensIndex > -1)
    boxes[boxIndex].splice(existingLensIndex, 1);
}

console.log(
  boxes.reduce(
    (sum, box, boxIndex) =>
      sum +
      box.reduce(
        (sum, lens, lensIndex) =>
          sum + (boxIndex + 1) * (lensIndex + 1) * lens.focalLength,
        0
      ),
    0
  )
);
