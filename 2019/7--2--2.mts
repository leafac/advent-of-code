import * as intcode from "./intcode.mts";

const ampProgram = [];

let highestSignal = -Infinity;
for (let ampAPhase = 5; ampAPhase <= 9; ampAPhase++)
  for (let ampBPhase = 5; ampBPhase <= 9; ampBPhase++)
    for (let ampCPhase = 5; ampCPhase <= 9; ampCPhase++)
      for (let ampDPhase = 5; ampDPhase <= 9; ampDPhase++)
        for (let ampEPhase = 5; ampEPhase <= 9; ampEPhase++)
          if (
            new Set([ampAPhase, ampBPhase, ampCPhase, ampDPhase, ampEPhase])
              .size === 5
          ) {
            const ampA = intcode.newMachine({
              memory: [...ampProgram],
              input: [ampAPhase, 0],
            });
            const ampB = intcode.newMachine({
              memory: [...ampProgram],
              input: [ampBPhase],
            });
            const ampC = intcode.newMachine({
              memory: [...ampProgram],
              input: [ampCPhase],
            });
            const ampD = intcode.newMachine({
              memory: [...ampProgram],
              input: [ampDPhase],
            });
            const ampE = intcode.newMachine({
              memory: [...ampProgram],
              input: [ampEPhase],
            });
            ampA.output = ampB.input;
            ampB.output = ampC.input;
            ampC.output = ampD.input;
            ampD.output = ampE.input;
            ampE.output = ampA.input;
            while (
              !ampA.halted &&
              !ampB.halted &&
              !ampC.halted &&
              !ampD.halted &&
              !ampE.halted
            ) {
              intcode.next(ampA);
              intcode.next(ampB);
              intcode.next(ampC);
              intcode.next(ampD);
              intcode.next(ampE);
              highestSignal = Math.max(highestSignal, ampE.output[0]);
            }
          }
console.log(highestSignal);
