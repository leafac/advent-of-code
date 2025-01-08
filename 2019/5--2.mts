let intcode = ``;

const memory = intcode.trim().split(",").map(Number);
const input = [5];
const output: number[] = [];

// opcode
// input and output

// opcode 5, 6, 7, 8

let instructionPointer = 0;

while (true) {
  const instruction = String(memory[instructionPointer++]);
  const paramModes = instruction.slice(0, -2).split("").map(Number).reverse();
  const opcode = Number(instruction.slice(-2));

  if (opcode === 1) {
    // Add
    const param1Address = memory[instructionPointer++];
    const param1Mode = paramModes[0] ?? 0;
    const param1Value =
      param1Mode === 0 ? memory[param1Address] : param1Address;
    const param2Address = memory[instructionPointer++];
    const param2Mode = paramModes[1] ?? 0;
    const param2Value =
      param2Mode === 0 ? memory[param2Address] : param2Address;
    const outputAddress = memory[instructionPointer++];
    memory[outputAddress] = param1Value + param2Value;
  } else if (opcode === 2) {
    // Multiply
    const param1Address = memory[instructionPointer++];
    const param1Mode = paramModes[0] ?? 0;
    const param1Value =
      param1Mode === 0 ? memory[param1Address] : param1Address;
    const param2Address = memory[instructionPointer++];
    const param2Mode = paramModes[1] ?? 0;
    const param2Value =
      param2Mode === 0 ? memory[param2Address] : param2Address;
    const outputAddress = memory[instructionPointer++];
    memory[outputAddress] = param1Value * param2Value;
  } else if (opcode === 3) {
    // Input
    const outputAddress = memory[instructionPointer++];
    memory[outputAddress] =
      input.shift() ??
      (() => {
        throw new Error();
      })();
  } else if (opcode === 4) {
    // Output
    const param1Address = memory[instructionPointer++];
    const param1Mode = paramModes[0] ?? 0;
    const param1Value =
      param1Mode === 0 ? memory[param1Address] : param1Address;
    output.push(param1Value);
  } else if (opcode === 5) {
    // Jump if true
    const param1Address = memory[instructionPointer++];
    const param1Mode = paramModes[0] ?? 0;
    const param1Value =
      param1Mode === 0 ? memory[param1Address] : param1Address;
    const param2Address = memory[instructionPointer++];
    const param2Mode = paramModes[1] ?? 0;
    const param2Value =
      param2Mode === 0 ? memory[param2Address] : param2Address;
    if (param1Value !== 0) {
      instructionPointer = param2Value;
    }
  } else if (opcode === 6) {
    // Jump if false
    const param1Address = memory[instructionPointer++];
    const param1Mode = paramModes[0] ?? 0;
    const param1Value =
      param1Mode === 0 ? memory[param1Address] : param1Address;
    const param2Address = memory[instructionPointer++];
    const param2Mode = paramModes[1] ?? 0;
    const param2Value =
      param2Mode === 0 ? memory[param2Address] : param2Address;
    if (param1Value === 0) {
      instructionPointer = param2Value;
    }
  } else if (opcode === 7) {
    // Less than
    const param1Address = memory[instructionPointer++];
    const param1Mode = paramModes[0] ?? 0;
    const param1Value =
      param1Mode === 0 ? memory[param1Address] : param1Address;
    const param2Address = memory[instructionPointer++];
    const param2Mode = paramModes[1] ?? 0;
    const param2Value =
      param2Mode === 0 ? memory[param2Address] : param2Address;
    const outputAddress = memory[instructionPointer++];
    memory[outputAddress] = param1Value < param2Value ? 1 : 0;
  } else if (opcode === 8) {
    // Equals
    const param1Address = memory[instructionPointer++];
    const param1Mode = paramModes[0] ?? 0;
    const param1Value =
      param1Mode === 0 ? memory[param1Address] : param1Address;
    const param2Address = memory[instructionPointer++];
    const param2Mode = paramModes[1] ?? 0;
    const param2Value =
      param2Mode === 0 ? memory[param2Address] : param2Address;
    const outputAddress = memory[instructionPointer++];
    memory[outputAddress] = param1Value === param2Value ? 1 : 0;
  } else if (opcode === 99) {
    break;
  } else throw new Error(`Invalid opcode: ${opcode}`);
}

console.log(output);
