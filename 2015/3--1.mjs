import { intern as $ } from "@radically-straightforward/utilities";

let input = `___`;

// input = `^v^v^v^v^v`;

let position = $({ x: 0, y: 0 });
console.log(
  new Set([
    position,
    ...input
      .trim()
      .split("")
      .map((instruction) => {
        position =
          instruction === "^"
            ? $({ x: position.x + 0, y: position.y - 1 })
            : instruction === ">"
            ? $({ x: position.x + 1, y: position.y + 0 })
            : instruction === "v"
            ? $({ x: position.x + 0, y: position.y + 1 })
            : instruction === "<"
            ? $({ x: position.x - 1, y: position.y + 0 })
            : (() => {
                throw new Error();
              })();
        return position;
      }),
  ]).size
);
