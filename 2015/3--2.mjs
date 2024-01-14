import { intern as $ } from "@radically-straightforward/utilities";

let input = `___`;

// input = `^v^v^v^v^v`;

let currentSanta = $({ x: 0, y: 0 });
let otherSanta = $({ x: 0, y: 0 });
console.log(
  new Set([
    currentSanta,
    ...input
      .trim()
      .split("")
      .map((instruction) => {
        currentSanta =
          instruction === "^"
            ? $({ x: currentSanta.x + 0, y: currentSanta.y - 1 })
            : instruction === ">"
            ? $({ x: currentSanta.x + 1, y: currentSanta.y + 0 })
            : instruction === "v"
            ? $({ x: currentSanta.x + 0, y: currentSanta.y + 1 })
            : instruction === "<"
            ? $({ x: currentSanta.x - 1, y: currentSanta.y + 0 })
            : (() => {
                throw new Error();
              })();
        [currentSanta, otherSanta] = [otherSanta, currentSanta];
        return otherSanta;
      }),
  ]).size
);
