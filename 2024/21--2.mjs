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

console.log(
  codes
    .map(
      (code) =>
        codeLength({
          code,
          keypads: [
            numericKeypad,
            ...Array.from({ length: 2 }, () => directionalKeypad),
          ],
        }) * Number(code.slice(0, -1))
    )
    .reduce((a, b) => a + b)
);

function codeLength({ code, keypads }) {
  if (keypads.length === 0) return code.length;
  code = "A" + code;
  let length = 0;
  for (let codeIndex = 1; codeIndex < code.length; codeIndex++)
    length += moveLength({
      from: code[codeIndex - 1],
      to: code[codeIndex],
      keypads,
    });
  return length;
}

function moveLength({ from, to, keypads }) {
  const [keypad, ...restKeypads] = keypads;
  keypads = restKeypads;
  from = keypad.get(from);
  to = keypad.get(to);
  let length = Infinity;
  if (keypad === numericKeypad) {
    length = Math.min(
      length,
      codeLength({
        code:
          "^".repeat(Math.max(0, from.row - to.row)) +
          ">".repeat(Math.max(0, to.column - from.column)) +
          "v".repeat(Math.max(0, to.row - from.row)) +
          "<".repeat(Math.max(0, from.column - to.column)) +
          "A",
        keypads,
      })
    );
    if (
      !(
        (from.row === 3 && to.column === 0) ||
        (from.column === 0 && to.row === 3)
      )
    )
      length = Math.min(
        length,
        codeLength({
          code:
            "v".repeat(Math.max(0, to.row - from.row)) +
            "<".repeat(Math.max(0, from.column - to.column)) +
            "^".repeat(Math.max(0, from.row - to.row)) +
            ">".repeat(Math.max(0, to.column - from.column)) +
            "A",
          keypads,
        })
      );
  } else if (keypad === directionalKeypad) {
    length = Math.min(
      length,
      codeLength({
        code:
          "v".repeat(Math.max(0, to.row - from.row)) +
          ">".repeat(Math.max(0, to.column - from.column)) +
          "^".repeat(Math.max(0, from.row - to.row)) +
          "<".repeat(Math.max(0, from.column - to.column)) +
          "A",
        keypads,
      })
    );
    if (
      !(
        (from.row === 3 && to.column === 0) ||
        (from.column === 0 && to.row === 3)
      )
    )
      length = Math.min(
        length,
        codeLength({
          code:
            "^".repeat(Math.max(0, from.row - to.row)) +
            "<".repeat(Math.max(0, from.column - to.column)) +
            "v".repeat(Math.max(0, to.row - from.row)) +
            ">".repeat(Math.max(0, to.column - from.column)) +
            "A",
          keypads,
        })
      );
  } else throw new Error();
  return length;
}
