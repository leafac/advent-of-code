let input = `
029A
980A
179A
456A
379A
`;

const codes = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const numericKeypad = new Map(
  `789
456
123
 0A`
    .split("\n")
    .flatMap((line, row) =>
      line.split("").map((character, column) => [character, { row, column }])
    )
);

const directionalKeypad = new Map(
  ` ^A
<v>`
    .split("\n")
    .flatMap((line, row) =>
      line.split("").map((character, column) => [character, { row, column }])
    )
);

function sequences({ code, row, column, keypad }) {
  if (code.length === 0) return [[]];
  const invalidCharacterInKeypad = keypad.get(" ");
  if (invalidCharacterInKeypad === undefined) throw new Error();
  if (
    row === invalidCharacterInKeypad.row &&
    column === invalidCharacterInKeypad.column
  )
    return [];
  const [codeCharacter, ...codeRest] = code;
  const codeCharacterInKeypad = keypad.get(codeCharacter);
  if (codeCharacterInKeypad === undefined) throw new Error();
  const answers = [];
  if (
    row === codeCharacterInKeypad.row &&
    column === codeCharacterInKeypad.column
  )
    for (const partialAnswer of sequences({
      code: codeRest,
      row,
      column,
      keypad,
    }))
      answers.push(["A", ...partialAnswer]);
  if (codeCharacterInKeypad.row < row)
    for (const partialAnswer of sequences({
      code,
      row: row - 1,
      column,
      keypad,
    }))
      answers.push(["^", ...partialAnswer]);
  if (column < codeCharacterInKeypad.column)
    for (const partialAnswer of sequences({
      code,
      row,
      column: column + 1,
      keypad,
    }))
      answers.push([">", ...partialAnswer]);
  if (row < codeCharacterInKeypad.row)
    for (const partialAnswer of sequences({
      code,
      row: row + 1,
      column,
      keypad,
    }))
      answers.push(["v", ...partialAnswer]);
  if (codeCharacterInKeypad.column < column)
    for (const partialAnswer of sequences({
      code,
      row,
      column: column - 1,
      keypad,
    }))
      answers.push(["<", ...partialAnswer]);
  return answers;
}

console.log(
  codes.reduce(
    (sumOfComplexities, code) =>
      sumOfComplexities +
      Number(code.join("").slice(0, -1)) *
        sequences({
          code,
          ...numericKeypad.get("A"),
          keypad: numericKeypad,
        })
          .flatMap((answer) =>
            sequences({
              code: answer,
              ...directionalKeypad.get("A"),
              keypad: directionalKeypad,
            })
          )
          .flatMap((answer) =>
            sequences({
              code: answer,
              ...directionalKeypad.get("A"),
              keypad: directionalKeypad,
            })
          )
          .reduce(
            (shortestLength, answer) => Math.min(shortestLength, answer.length),
            Infinity
          ),
    0
  )
);
