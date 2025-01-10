let intcode = ``;

function run(input: number[]) {
  const memory = intcode.trim().split(",").map(Number);
  const output: number[] = [];

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

  return output;
}

function permutationsWithoutRepetition<T>(arr: T[]): T[][] {
  if (arr.length === 0) return [[]];
  const result: T[][] = [];
  for (const [i, x] of arr.entries()) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutationsWithoutRepetition(rest)) {
      result.push([x, ...perm]);
    }
  }
  return result;
}

// func run(memory []int, input []int) int {
// func permutations_without_repetition(arr []int) [][]int {
// max
// for _, permutation := range permutations_without_repetition([]int{0, 1, 2, 3, 4}) {
//  input = 0, for amplifier in amplifiers: input = run(memory, [amplifier[setting], input])[0]

let max = -Infinity;

for (const permutation of permutationsWithoutRepetition([0, 1, 2, 3, 4])) {
  let input = 0;
  for (const setting of permutation) {
    input = run([setting, input])[0];
  }
  max = Math.max(max, input);
}

console.log(max);
// 398674