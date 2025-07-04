import * as intcode from "./intcode.mts";

const machine = intcode.newMachine({
  memory: "1,9,10,3",
});

console.log(intcode.deassembly(machine));
