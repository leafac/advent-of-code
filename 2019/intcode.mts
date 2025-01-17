export type Machine = {
  memory: MapWithDefault<bigint, bigint>;
  input: bigint[];
  output: bigint[];
  instructionPointer: bigint;
  relativeBase: bigint;
  halted: boolean;
};

export function newMachine({
  memory,
  input = "",
}: {
  memory: string;
  input?: string;
}): Machine {
  const memoryMapWithDefault = new MapWithDefault(
    memory
      .trim()
      .split(",")
      .map((numberString, index) => [BigInt(index), BigInt(numberString)])
  );
  memoryMapWithDefault.default = 0n;
  return {
    memory: memoryMapWithDefault,
    input: input.trim().split(",").map(BigInt),
    output: [],
    instructionPointer: 0n,
    relativeBase: 0n,
    halted: false,
  };
}

export function step(machine: Machine): void {
  const instruction = machine.memory.get(machine.instructionPointer++) ?? 0n;
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
    if (parameter1 !== 0n) machine.instructionPointer = parameter2;
  } else if (opcode === 6) {
    const parameter1 = getParameter();
    const parameter2 = getParameter();
    if (parameter1 === 0n) machine.instructionPointer = parameter2;
  } else if (opcode === 7)
    setParameter(getParameter() < getParameter() ? 1n : 0n);
  else if (opcode === 8)
    setParameter(getParameter() === getParameter() ? 1n : 0n);
  else if (opcode === 9) machine.relativeBase += getParameter();
  else if (opcode === 99) machine.halted = true;
  else throw new Error();
  function getParameter(): bigint {
    const parameterMode = parameterModes.pop() ?? 0;
    return parameterMode === 0
      ? machine.memory.get(
          machine.memory.get(machine.instructionPointer++) ?? 0n
        ) ?? 0n
      : parameterMode === 1
      ? machine.memory.get(machine.instructionPointer++) ?? 0n
      : parameterMode === 2
      ? machine.memory.get(
          machine.relativeBase +
            (machine.memory.get(machine.instructionPointer++) ?? 0n)
        ) ?? 0n
      : (() => {
          throw new Error();
        })();
  }
  function setParameter(number: bigint): void {
    if ((parameterModes.pop() ?? 0) !== 0) throw new Error();
    machine.memory.set(
      machine.memory.get(machine.instructionPointer++) ?? 0n,
      number
    );
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

class MapWithDefault<Key, Value> extends Map<Key, Value> {
  default: Value;
  get(key: Key): Value {
    return super.get(key) ?? this.default;
  }
}
