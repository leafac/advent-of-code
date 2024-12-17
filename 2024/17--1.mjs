let A = 729;
let B = 0;
let C = 0;
const program = [0, 1, 5, 4, 3, 0];
const output = [];
let instructionPointer = 0;
while (instructionPointer < program.length) {
  const opcode = program[instructionPointer];
  const literalOperand = program[instructionPointer + 1];
  const comboOperand =
    0 <= literalOperand && literalOperand <= 3
      ? literalOperand
      : literalOperand === 4
      ? A
      : literalOperand === 5
      ? B
      : literalOperand === 6
      ? C
      : (() => {
          throw new Error();
        })();
  if (opcode === 0) A = Math.trunc(A / 2 ** comboOperand);
  else if (opcode === 1) B = B ^ literalOperand;
  else if (opcode === 2) B = comboOperand % 8;
  else if (opcode === 3) {
    if (A !== 0) {
      instructionPointer = literalOperand;
      continue;
    }
  } else if (opcode === 4) B = B ^ C;
  else if (opcode === 5) output.push(comboOperand % 8);
  else if (opcode === 6) B = Math.trunc(A / 2 ** comboOperand);
  else if (opcode === 7) C = Math.trunc(A / 2 ** comboOperand);
  else throw new Error();
  instructionPointer += 2;
}
console.log(output.join(","));
