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
  const cacheKey = JSON.stringify({ from, to, keypads });
  const cachedLength = moveLength.cache.get(cacheKey);
  if (cachedLength !== undefined) return cachedLength;
  const [keypad, ...restKeypads] = keypads;
  keypads = restKeypads;
  from = keypad.get(from);
  to = keypad.get(to);
  const disallowed = keypad.get("X");
  let length = codeLength({
    code:
      keypad === numericKeypad
        ? "^".repeat(Math.max(0, from.row - to.row)) +
          ">".repeat(Math.max(0, to.column - from.column)) +
          "v".repeat(Math.max(0, to.row - from.row)) +
          "<".repeat(Math.max(0, from.column - to.column)) +
          "A"
        : keypad === directionalKeypad
        ? "v".repeat(Math.max(0, to.row - from.row)) +
          ">".repeat(Math.max(0, to.column - from.column)) +
          "^".repeat(Math.max(0, from.row - to.row)) +
          "<".repeat(Math.max(0, from.column - to.column)) +
          "A"
        : (() => {
            throw new Error();
          })(),
    keypads,
  });
  if (
    !(
      (from.row === disallowed.row && to.column === disallowed.column) ||
      (from.column === disallowed.column && to.row === disallowed.row)
    )
  )
    length = Math.min(
      length,
      codeLength({
        code:
          keypad === numericKeypad
            ? "v".repeat(Math.max(0, to.row - from.row)) +
              "<".repeat(Math.max(0, from.column - to.column)) +
              "^".repeat(Math.max(0, from.row - to.row)) +
              ">".repeat(Math.max(0, to.column - from.column)) +
              "A"
            : keypad === directionalKeypad
            ? "^".repeat(Math.max(0, from.row - to.row)) +
              "<".repeat(Math.max(0, from.column - to.column)) +
              "v".repeat(Math.max(0, to.row - from.row)) +
              ">".repeat(Math.max(0, to.column - from.column)) +
              "A"
            : (() => {
                throw new Error();
              })(),
        keypads,
      })
    );
  moveLength.cache.set(cacheKey, length);
  return length;
}
moveLength.cache = new Map();

console.log(
  codes
    .map(
      (code) =>
        codeLength({
          code,
          keypads: [
            numericKeypad,
            ...Array.from({ length: 25 }, () => directionalKeypad),
          ],
        }) * Number(code.slice(0, -1))
    )
    .reduce((a, b) => a + b)
);
