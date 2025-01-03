let input = ``;

// input = `1,9,10,3,2,3,11,0,99,30,40,50`;

const memory = input.trim().split(",").map(Number);

memory[1] = 12;
memory[2] = 2;

let instructionIndex = 0;

while (true) {
  const opcode = memory[instructionIndex];
  if (opcode === 1) {
    const input1Index = memory[instructionIndex + 1];
    const input2Index = memory[instructionIndex + 2];
    const outputIndex = memory[instructionIndex + 3];
    memory[outputIndex] = memory[input1Index] + memory[input2Index];
    instructionIndex += 4;
  } else if (opcode === 2) {
    const input1Index = memory[instructionIndex + 1];
    const input2Index = memory[instructionIndex + 2];
    const outputIndex = memory[instructionIndex + 3];
    memory[outputIndex] = memory[input1Index] * memory[input2Index];
    instructionIndex += 4;
  } else if (opcode === 99) break;
  else throw new Error();
}

console.log(memory[0]);
