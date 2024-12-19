// const program = [___];
(function step({ partialA, programIndex }) {
  if (programIndex === -1) {
    console.log(partialA);
    process.exit();
  }
  for (let partA = BigInt("0b000"); partA <= BigInt("0b111"); partA++) {
    let initialA = BigInt(
      `0b${partialA.toString(2)}${partA.toString(2).padStart(3, "0")}`
    );
    let A = initialA;
    let B = 0n;
    let C = 0n;
    const output = [];
    let instructionPointer = 0n;
    while (instructionPointer < program.length) {
      const opcode = program[instructionPointer];
      const literalOperand = BigInt(program[instructionPointer + 1n]);
      const comboOperand =
        0n <= literalOperand && literalOperand <= 3n
          ? literalOperand
          : literalOperand === 4n
          ? A
          : literalOperand === 5n
          ? B
          : literalOperand === 6n
          ? C
          : (() => {
              throw new Error();
            })();
      if (opcode === 0) A = A / 2n ** comboOperand;
      else if (opcode === 1) B = B ^ literalOperand;
      else if (opcode === 2) B = comboOperand % 8n;
      else if (opcode === 3) {
        if (A !== 0n) {
          instructionPointer = literalOperand;
          continue;
        }
      } else if (opcode === 4) B = B ^ C;
      else if (opcode === 5) output.push(Number(comboOperand % 8n));
      else if (opcode === 6) B = A / 2n ** comboOperand;
      else if (opcode === 7) C = A / 2n ** comboOperand;
      else throw new Error();
      instructionPointer += 2n;
    }
    if (output[0] === program[programIndex])
      step({ partialA: initialA, programIndex: programIndex - 1 });
  }
})({
  partialA: BigInt("0b0"),
  programIndex: program.length - 1,
});

// for (let index = 0; index < program.length; index += 2) {
//   const opcode = program[index];
//   const literalOperand = program[index + 1];
//   const comboOperand =
//     0 <= literalOperand && literalOperand <= 3
//       ? String(literalOperand)
//       : literalOperand === 4
//       ? "A"
//       : literalOperand === 5
//       ? "B"
//       : literalOperand === 6
//       ? "C"
//       : (() => {
//           throw new Error();
//         })();
//   console.log(
//     `${index}: ${
//       opcode === 0
//         ? `A = A / (2**${comboOperand})`
//         : opcode === 1
//         ? `B = B ^ ${literalOperand}`
//         : opcode === 2
//         ? `B = ${comboOperand} % 8`
//         : opcode === 3
//         ? `IF (A !== 0) GOTO ${literalOperand}`
//         : opcode === 4
//         ? `B = B ^ C`
//         : opcode === 5
//         ? `PRINT(${comboOperand} % 8)`
//         : opcode === 6
//         ? `B = A / (2**${comboOperand})`
//         : opcode === 7
//         ? `C = A / (2**${comboOperand})`
//         : (() => {
//             throw new Error();
//           })()
//     }`
//   );
// }
