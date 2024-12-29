let input = `
029A
980A
179A
456A
379A
`;

const codes = input.trim().split("\n");

const [numericKeypad, directionalKeypad] = [
  `
789
456
123
X0A
`,
  `
X^A
<v>
`,
].map(
  (keypadString) =>
    new Map(
      keypadString
        .trim()
        .split("\n")
        .flatMap((line, row) =>
          line.split("").map((key, column) => [key, { row, column }])
        )
    )
);

let codeComplexitiesSum = 0;
for (const code of codes) {
  let shortestSequenceLength = 0;
  for (let codeIndex = 0; codeIndex < code.length; codeIndex++) {
    const from = numericKeypad.get(codeIndex === 0 ? "A" : code[codeIndex - 1]);
    const to = numericKeypad.get(code[codeIndex]);
    let sequences = [];
    sequences.push(
      "^".repeat(Math.max(0, from.row - to.row)) +
        ">".repeat(Math.max(0, to.column - from.column)) +
        "v".repeat(Math.max(0, to.row - from.row)) +
        "<".repeat(Math.max(0, from.column - to.column)) +
        "A"
    );
    if (
      !(
        (from.row === 3 && to.column === 0) ||
        (from.column === 0 && to.row === 3)
      )
    )
      sequences.push(
        "v".repeat(Math.max(0, to.row - from.row)) +
          "<".repeat(Math.max(0, from.column - to.column)) +
          "^".repeat(Math.max(0, from.row - to.row)) +
          ">".repeat(Math.max(0, to.column - from.column)) +
          "A"
      );
    for (
      let directionalKeypadIteration = 0;
      directionalKeypadIteration < 2;
      directionalKeypadIteration++
    )
      sequences = sequences.flatMap((sequence) => {
        let sequences = [""];
        for (
          let sequenceIndex = 0;
          sequenceIndex < sequence.length;
          sequenceIndex++
        ) {
          const from = directionalKeypad.get(
            sequenceIndex === 0 ? "A" : sequence[sequenceIndex - 1]
          );
          const to = directionalKeypad.get(sequence[sequenceIndex]);
          sequences = sequences.flatMap((sequence) => {
            const sequences = [];
            sequences.push(
              sequence +
                "v".repeat(Math.max(0, to.row - from.row)) +
                ">".repeat(Math.max(0, to.column - from.column)) +
                "^".repeat(Math.max(0, from.row - to.row)) +
                "<".repeat(Math.max(0, from.column - to.column)) +
                "A"
            );
            if (
              !(
                (from.row === 0 && to.column === 0) ||
                (from.column === 0 && to.row === 0)
              )
            )
              sequences.push(
                sequence +
                  "^".repeat(Math.max(0, from.row - to.row)) +
                  "<".repeat(Math.max(0, from.column - to.column)) +
                  "v".repeat(Math.max(0, to.row - from.row)) +
                  ">".repeat(Math.max(0, to.column - from.column)) +
                  "A"
              );
            return sequences;
          });
        }
        return sequences;
      });
    shortestSequenceLength += sequences
      .map((sequence) => sequence.length)
      .reduce((a, b) => Math.min(a, b), Infinity);
  }
  codeComplexitiesSum += shortestSequenceLength * Number(code.slice(0, -1));
}
console.log(codeComplexitiesSum);
