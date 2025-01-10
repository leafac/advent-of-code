let intcode = ``;

// const amplifier = new Amplifier({program, input})
// amplifier.input = [...amplifier.input, state]
// done, state = amplifier.next()

class Amplifier {
  memory: number[];
  input: number[];
  instructionPointer: number;
  output: number[];
  generator = this._generator();

  constructor({ memory, input }: { memory: number[]; input: number[] }) {
    this.memory = memory;
    this.input = input;
    this.instructionPointer = 0;
    this.output = [];
  }

  *_generator() {
    while (true) {
      const instruction = String(this.memory[this.instructionPointer++]);
      const paramModes = instruction
        .slice(0, -2)
        .split("")
        .map(Number)
        .reverse();
      const opcode = Number(instruction.slice(-2));

      if (opcode === 1) {
        // Add
        const param1Address = this.memory[this.instructionPointer++];
        const param1Mode = paramModes[0] ?? 0;
        const param1Value =
          param1Mode === 0 ? this.memory[param1Address] : param1Address;
        const param2Address = this.memory[this.instructionPointer++];
        const param2Mode = paramModes[1] ?? 0;
        const param2Value =
          param2Mode === 0 ? this.memory[param2Address] : param2Address;
        const outputAddress = this.memory[this.instructionPointer++];
        this.memory[outputAddress] = param1Value + param2Value;
      } else if (opcode === 2) {
        // Multiply
        const param1Address = this.memory[this.instructionPointer++];
        const param1Mode = paramModes[0] ?? 0;
        const param1Value =
          param1Mode === 0 ? this.memory[param1Address] : param1Address;
        const param2Address = this.memory[this.instructionPointer++];
        const param2Mode = paramModes[1] ?? 0;
        const param2Value =
          param2Mode === 0 ? this.memory[param2Address] : param2Address;
        const outputAddress = this.memory[this.instructionPointer++];
        this.memory[outputAddress] = param1Value * param2Value;
      } else if (opcode === 3) {
        // Input
        const outputAddress = this.memory[this.instructionPointer++];
        this.memory[outputAddress] =
          this.input.shift() ??
          (() => {
            throw new Error();
          })();
      } else if (opcode === 4) {
        // Output
        const param1Address = this.memory[this.instructionPointer++];
        const param1Mode = paramModes[0] ?? 0;
        const param1Value =
          param1Mode === 0 ? this.memory[param1Address] : param1Address;
        this.output.push(param1Value);
        yield;
      } else if (opcode === 5) {
        // Jump if true
        const param1Address = this.memory[this.instructionPointer++];
        const param1Mode = paramModes[0] ?? 0;
        const param1Value =
          param1Mode === 0 ? this.memory[param1Address] : param1Address;
        const param2Address = this.memory[this.instructionPointer++];
        const param2Mode = paramModes[1] ?? 0;
        const param2Value =
          param2Mode === 0 ? this.memory[param2Address] : param2Address;
        if (param1Value !== 0) {
          this.instructionPointer = param2Value;
        }
      } else if (opcode === 6) {
        // Jump if false
        const param1Address = this.memory[this.instructionPointer++];
        const param1Mode = paramModes[0] ?? 0;
        const param1Value =
          param1Mode === 0 ? this.memory[param1Address] : param1Address;
        const param2Address = this.memory[this.instructionPointer++];
        const param2Mode = paramModes[1] ?? 0;
        const param2Value =
          param2Mode === 0 ? this.memory[param2Address] : param2Address;
        if (param1Value === 0) {
          this.instructionPointer = param2Value;
        }
      } else if (opcode === 7) {
        // Less than
        const param1Address = this.memory[this.instructionPointer++];
        const param1Mode = paramModes[0] ?? 0;
        const param1Value =
          param1Mode === 0 ? this.memory[param1Address] : param1Address;
        const param2Address = this.memory[this.instructionPointer++];
        const param2Mode = paramModes[1] ?? 0;
        const param2Value =
          param2Mode === 0 ? this.memory[param2Address] : param2Address;
        const outputAddress = this.memory[this.instructionPointer++];
        this.memory[outputAddress] = param1Value < param2Value ? 1 : 0;
      } else if (opcode === 8) {
        // Equals
        const param1Address = this.memory[this.instructionPointer++];
        const param1Mode = paramModes[0] ?? 0;
        const param1Value =
          param1Mode === 0 ? this.memory[param1Address] : param1Address;
        const param2Address = this.memory[this.instructionPointer++];
        const param2Mode = paramModes[1] ?? 0;
        const param2Value =
          param2Mode === 0 ? this.memory[param2Address] : param2Address;
        const outputAddress = this.memory[this.instructionPointer++];
        this.memory[outputAddress] = param1Value === param2Value ? 1 : 0;
      } else if (opcode === 99) {
        return;
      } else throw new Error(`Invalid opcode: ${opcode}`);
    }

    throw new Error("Unreachable");
  }
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

// memoryMap[amplifierId] = memory
// return { output, done: bool }
// 5-10
// function *run(memory, input)
// --
// amplifierMap: Array<Generator<Output>>
// let state = 0
// for (amplifier) {
//   state, done = amplifier.next(input)
//   if (done) break

// we need to pause before it reads another input
// we need to execute the next machine

let max = -Infinity;

const program = intcode.split(",").map(Number);

for (const settings of permutationsWithoutRepetition([5, 6, 7, 8, 9])) {
  const amplifiers = settings.map(
    (x) => new Amplifier({ memory: program, input: [x] })
  );
  let state = 0;
  while (true) {
    let doneCount = 0;
    for (const amplifier of amplifiers) {
      amplifier.input = [...amplifier.input, state];
      const { done } = amplifier.generator.next();
      const output = amplifier.output.at(-1);
      if (output === undefined) throw new Error("Output is undefined");
      state = output;
      if (done) doneCount++;
    }
    max = Math.max(max, state);
    if (doneCount === amplifiers.length) break;
  }
}

console.log(max);
