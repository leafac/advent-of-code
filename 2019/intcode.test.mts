import test from "node:test";
import assert from "node:assert/strict";
import * as intcode from "./intcode.mts";

test("https://adventofcode.com/2019/day/2", () => {
  {
    const machine = intcode.newMachine({
      memory: "1,9,10,3,2,3,11,0,99,30,40,50",
    });
    intcode.step(machine);
    assert.deepEqual(
      machine.memory,
      "1,9,10,70,2,3,11,0,99,30,40,50"
    );
    intcode.step(machine);
    assert.deepEqual(
      machine.memory,
      "3500,9,10,70,2,3,11,0,99,30,40,50"
    );
  }
  {
    const machine = intcode.newMachine({ memory: 
      "1,0,0,0,99"
    });
    intcode.run(machine);
    assert.deepEqual(machine.memory, 
      "2,0,0,0,99"
    );
  }
  {
    const machine = intcode.newMachine({ memory: 
      "2,3,0,3,99"
    });
    intcode.run(machine);
    assert.deepEqual(machine.memory, 
      "2,3,0,6,99"
    );
  }
  {
    const machine = intcode.newMachine({ memory: 
      "2,4,4,5,99,0"
    });
    intcode.run(machine);
    assert.deepEqual(machine.memory, 
      "2,4,4,5,99,9801"
    );
  }
  {
    const machine = intcode.newMachine({
      memory: 
      "1,1,1,4,99,5,6,0,99"

    });
    intcode.run(machine);
    assert.deepEqual(machine.memory, 
      "30,1,1,4,2,5,6,0,99"
    );
  }
});

test("https://adventofcode.com/2019/day/5", () => {
  {
    const machine = intcode.newMachine({
      memory: "3,0,4,0,99",
      input: "34",
    });
    intcode.run(machine);
    assert.deepEqual(machine.input, []);
    assert.deepEqual(machine.output, [34n]);
  }
  {
    const machine = intcode.newMachine({ memory: 
      "1002,4,3,4,33"
    });
    intcode.step(machine);
    assert.deepEqual(machine.memory, 
      [1002n, 4n, 3n, 4n, 99n]
    );
  }
  {
    const machine = intcode.newMachine({
      memory: 
      "3,9,8,9,10,9,4,9,99,-1,8",
      input: "8",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [1n]);
  }
  {
    const machine = intcode.newMachine({
      memory: "3,9,8,9,10,9,4,9,99,-1,8",
      input: "7",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [0n]);
  }
  {
    const machine = intcode.newMachine({
      memory:"3,9,7,9,10,9,4,9,99,-1,8",
      input: "7",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [1n]);
  }
  {
    const machine = intcode.newMachine({
      memory:"3,9,7,9,10,9,4,9,99,-1,8",
      input: "8",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [0n]);
  }
  {
    const machine = intcode.newMachine({
      memory:"3,3,1108,-1,8,3,4,3,99",
      input: "8",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [1n]);
  }
  {
    const machine = intcode.newMachine({
      memory:"3,3,1108,-1,8,3,4,3,99",
      input: "7",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [0n]);
  }
  {
    const machine = intcode.newMachine({
      memory:"3,3,1107,-1,8,3,4,3,99",
      input: "7",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [1n]);
  }
  {
    const machine = intcode.newMachine({
      memory:"3,3,1107,-1,8,3,4,3,99",
      input: "8",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [0n]);
  }
  {
    const machine = intcode.newMachine({
      memory:"3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9",
      input: "0",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [0n]);
  }
  {
    const machine = intcode.newMachine({
      memory:"3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9",
      input: "34",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [1n]);
  }
  {
    const machine = intcode.newMachine({
      memory:"3,3,1105,-1,9,1101,0,0,12,4,12,99,1",
      input: "0",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [0n]);
  }
  {
    const machine = intcode.newMachine({
      // memory: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
      memory:"3,3,1105,-1,9,1101,0,0,12,4,12,99,1",
      input: "34",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [1n]);
  }
  {
    const machine = intcode.newMachine({
      memory: "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
      input: "7",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [999n]);
  }
  {
    const machine = intcode.newMachine({
      memory: "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
      input: "8",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [1000n]);
  }
  {
    const machine = intcode.newMachine({
      memory: "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
      input: "9",
    });
    intcode.run(machine);
    assert.deepEqual(machine.output, [1001n]);
  }
});
