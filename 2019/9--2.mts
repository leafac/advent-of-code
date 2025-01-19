import * as intcode from "./9--1--intcode.mts";

const machine = intcode.newMachine({
  memory: "",
  input: "2",
});
intcode.run(machine);
console.log(machine.output.map(String).join(","));
