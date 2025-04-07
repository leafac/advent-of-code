import * as intcode from "./13--intcode.mts";

const machine = intcode.newMachine({
  memory: "",
});

intcode.run(machine);

let blocks = 0;

for (let index = 2; index < machine.output.length; index += 3)
  if (machine.output[index] === 2n) blocks++;

console.log(blocks);
