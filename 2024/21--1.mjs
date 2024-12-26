let input = `
029A
980A
179A
456A
379A
`;

const numericKeypadString = `
789
456
123
X0A
`;

const directionalKeypadString = `
X^A
<v>
`;

const [numericKeypadCoordinates, directionalKeypadCoordinates] = [
  numericKeypadString,
  directionalKeypadString,
].map((keypadString) =>
  keypadString
    .trim()
    .split("\n")
    .flatMap((line, row) =>
      line
        .split("")
        .flatMap((button, column) =>
          button === "X" ? [] : [{ button, row, column }]
        )
    )
);

const numericKeypadMoves = new Map();
for (const from of numericKeypadCoordinates) {
  const fromKeyboardMoves = new Map();
  for (const to of numericKeypadCoordinates)
    fromKeyboardMoves.set(
      to.button,
      "^".repeat(Math.max(0, from.row - to.row)) +
        ">".repeat(Math.max(0, to.column - from.column)) +
        "v".repeat(Math.max(0, to.row - from.row)) +
        "<".repeat(Math.max(0, from.column - to.column)) +
        "A"
    );
  numericKeypadMoves.set(from.button, fromKeyboardMoves);
}
const directionalKeypadMoves = new Map();
for (const from of directionalKeypadCoordinates) {
  const fromKeyboardMoves = new Map();
  for (const to of directionalKeypadCoordinates)
    fromKeyboardMoves.set(
      to.button,
      "v".repeat(Math.max(0, to.row - from.row)) +
        ">".repeat(Math.max(0, to.column - from.column)) +
        "^".repeat(Math.max(0, from.row - to.row)) +
        "<".repeat(Math.max(0, from.column - to.column)) +
        "A"
    );
  directionalKeypadMoves.set(from.button, fromKeyboardMoves);
}

let sum = 0;
for (const originalSequence of input.trim().split("\n")) {
  let sequence = originalSequence;
  for (const keypadMoves of [
    numericKeypadMoves,
    directionalKeypadMoves,
    directionalKeypadMoves,
  ]) {
    let nextSequence = "";
    sequence = "A" + sequence;
    for (let index = 1; index < sequence.length; index++)
      nextSequence += keypadMoves.get(sequence[index - 1]).get(sequence[index]);
    sequence = nextSequence;
  }
  sum += sequence.length * Number(originalSequence.slice(0, -1));
}
console.log(sum);
