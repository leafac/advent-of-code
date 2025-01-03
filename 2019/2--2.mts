let input = ``;

// input = `1,9,10,3,2,3,11,0,99,30,40,50`;

for (let noun = 0; noun <= 99; noun++)
  for (let verb = 0; verb <= 99; verb++) {
    const memory = input.trim().split(",").map(Number);

    memory[1] = noun;
    memory[2] = verb;

    let instructionPointer = 0;

    while (true) {
      const opcode = memory[instructionPointer];
      if (opcode === 1) {
        const parameter1Address = memory[instructionPointer + 1];
        const parameter2Address = memory[instructionPointer + 2];
        const outputAddress = memory[instructionPointer + 3];
        memory[outputAddress] =
          memory[parameter1Address] + memory[parameter2Address];
        instructionPointer += 4;
      } else if (opcode === 2) {
        const parameter1Address = memory[instructionPointer + 1];
        const parameter2Address = memory[instructionPointer + 2];
        const outputAddress = memory[instructionPointer + 3];
        memory[outputAddress] =
          memory[parameter1Address] * memory[parameter2Address];
        instructionPointer += 4;
      } else if (opcode === 99) {
        break;
        instructionPointer += 1;
      } else throw new Error();
    }

    if (memory[0] === 19690720) {
      console.log(100 * noun + verb);
      process.exit();
    }
  }
