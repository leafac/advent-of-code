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
  const instruction = machine.memory.get(machine.instructionPointer++);
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
      ? machine.memory.get(machine.memory.get(machine.instructionPointer++))
      : parameterMode === 1
      ? machine.memory.get(machine.instructionPointer++)
      : parameterMode === 2
      ? machine.memory.get(
          machine.relativeBase +
            machine.memory.get(machine.instructionPointer++)
        )
      : (() => {
          throw new Error();
        })();
  }
  function setParameter(number: bigint): void {
    const parameterMode = parameterModes.pop() ?? 0;
    if (parameterMode === 0)
      machine.memory.set(
        machine.memory.get(machine.instructionPointer++),
        number
      );
    else if (parameterMode === 2)
      machine.memory.set(
        machine.relativeBase + machine.memory.get(machine.instructionPointer++),
        number
      );
    else throw new Error();
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

export function deassembly(machine: Machine): string {
  let assembly = "";
  const memoryIndexes = [...machine.memory.keys()].sort();
  while (0 < memoryIndexes.length) {
    const instruction = machine.memory.get(memoryIndexes.shift()!);
    const opcode = Number(instruction.toString().slice(-2));
    const parameterModes = instruction
      .toString()
      .slice(0, -2)
      .split("")
      .map(Number);
    if (opcode === 1) {
      const operand1 = getParameter();
      const operand2 = getParameter();
      const result = setParameter();
      assembly += `${result} = ${operand1} + ${operand2}\n`;
    }
    // else if (opcode === 2) setParameter(getParameter() * getParameter());
    // else if (opcode === 3)
    //   setParameter(
    //     machine.input.shift() ??
    //       (() => {
    //         throw new Error();
    //       })()
    //   );
    // else if (opcode === 4) machine.output.push(getParameter());
    // else if (opcode === 5) {
    //   const parameter1 = getParameter();
    //   const parameter2 = getParameter();
    //   if (parameter1 !== 0n) machine.instructionPointer = parameter2;
    // } else if (opcode === 6) {
    //   const parameter1 = getParameter();
    //   const parameter2 = getParameter();
    //   if (parameter1 === 0n) machine.instructionPointer = parameter2;
    // } else if (opcode === 7)
    //   setParameter(getParameter() < getParameter() ? 1n : 0n);
    // else if (opcode === 8)
    //   setParameter(getParameter() === getParameter() ? 1n : 0n);
    // else if (opcode === 9) machine.relativeBase += getParameter();
    // else if (opcode === 99) machine.halted = true;
    else throw new Error();
    function getParameter(): string {
      const parameterMode = parameterModes.pop() ?? 0;
      return parameterMode === 0
        ? String(machine.memory.get(memoryIndexes.shift() ?? -1n))
        : parameterMode === 1
        ? "@" + String(machine.memory.get(memoryIndexes.shift() ?? -1n))
        : parameterMode === 2
        ? "~" +
          String(
            machine.relativeBase +
              machine.memory.get(memoryIndexes.shift() ?? -1n)
          )
        : (() => {
            throw new Error();
          })();
    }
    function setParameter(): string {
      const parameterMode = parameterModes.pop() ?? 0;
      return parameterMode === 0
        ? "@" + String(machine.memory.get(memoryIndexes.shift() ?? -1n))
        : parameterMode === 2
        ? "~" +
          String(
            machine.relativeBase +
              machine.memory.get(memoryIndexes.shift() ?? -1n)
          )
        : (() => {
            throw new Error();
          })();
    }
  }
  return assembly;
}

class MapWithDefault<Key, Value> extends Map<Key, Value> {
  default: Value;
  get(key: Key): Value {
    return super.get(key) ?? this.default;
  }
}
