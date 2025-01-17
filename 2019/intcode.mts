export type Machine = {
  memory: bigint[];
  input: bigint[];
  output: bigint[];
  instructionPointer: bigint;
  relativeBase: bigint;
  halted: boolean;
};

export function newMachine({
  memory,
  input = [],
}: {
  memory: bigint[];
  input?: bigint[];
}): Machine {
  return {
    memory,
    input,
    output: [],
    instructionPointer: 0n,
    relativeBase: 0n,
    halted: false,
  };
}

export function step(machine: Machine): void {
  const instruction = machine.memory[machine.instructionPointer++];
  const opcode = Number(instruction.toString().slice(-2));
  const parameterModes = instruction
    .toString()
    .slice(0, -2)
    .split("")
    .map(Number);
  if (opcode === 1) setParameter(getParameter() + getParameter());
  else if (opcode === 2) setParameter(getParameter() * getParameter());
  else if (opcode === 3)
    setParameter(
      machine.input.shift() ??
        (() => {
          throw new Error();
        })()
    );
  else if (opcode === 4) machine.output.push(getParameter());
  else if (opcode === 5) {
    const parameter1 = getParameter();
    const parameter2 = getParameter();
    if (parameter1 !== 0) machine.instructionPointer = parameter2;
  } else if (opcode === 6) {
    const parameter1 = getParameter();
    const parameter2 = getParameter();
    if (parameter1 === 0) machine.instructionPointer = parameter2;
  } else if (opcode === 7)
    setParameter(getParameter() < getParameter() ? 1 : 0);
  else if (opcode === 8)
    setParameter(getParameter() === getParameter() ? 1 : 0);
  else if (opcode === 9) machine.relativeBase += getParameter();
  else if (opcode === 99) machine.halted = true;
  else throw new Error();
  function getParameter(): bigint {
    const parameterMode = parameterModes.pop() ?? 0;
    return parameterMode === 0
      ? machine.memory[machine.memory[machine.instructionPointer++]]
      : parameterMode === 1
      ? machine.memory[machine.instructionPointer++]
      : parameterMode === 2
      ? machine.memory[
          machine.relativeBase + machine.memory[machine.instructionPointer++]
        ]
      : (() => {
          throw new Error();
        })();
  }
  function setParameter(number: bigint): void {
    if ((parameterModes.pop() ?? 0) !== 0) throw new Error();
    machine.memory[machine.memory[machine.instructionPointer++]] = number;
  }
}

export function run(machine: Machine): void {
  while (!machine.halted) step(machine);
}

export function next(machine: Machine): void {
  const outputLength = machine.output.length;
  while (!machine.halted && machine.output.length === outputLength)
    step(machine);
}
