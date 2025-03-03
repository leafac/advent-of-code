import * as intcode from "./11--intcode.mts";

const robot = {
  direction: "^",
  x: 0,
  y: 0,
};

const ship = new Map<string, bigint>([
  [JSON.stringify({ x: robot.x, y: robot.y }), 1n],
]);

const machine = intcode.newMachine({
  memory: "",
});
machine.input = {
  shift: () => ship.get(JSON.stringify({ x: robot.x, y: robot.y })),
} as any;
while (true) {
  intcode.next(machine);
  if (machine.halted) break;
  const color = machine.output.shift();
  if (color === undefined) throw new Error();
  intcode.next(machine);
  if (machine.halted) break;
  const rotation = machine.output.shift();
  if (rotation === undefined) throw new Error();
  ship.set(JSON.stringify({ x: robot.x, y: robot.y }), color);
  robot.direction =
    robot.direction === "^"
      ? rotation === 0n
        ? "<"
        : ">"
      : robot.direction === ">"
      ? rotation === 0n
        ? "^"
        : "v"
      : robot.direction === "v"
      ? rotation === 0n
        ? ">"
        : "<"
      : robot.direction === "<"
      ? rotation === 0n
        ? "v"
        : "^"
      : (() => {
          throw new Error();
        })();
  if (robot.direction === "^") robot.y--;
  else if (robot.direction === ">") robot.x++;
  else if (robot.direction === "v") robot.y++;
  else if (robot.direction === "<") robot.x--;
  if (ship.get(JSON.stringify({ x: robot.x, y: robot.y })) === undefined)
    ship.set(JSON.stringify({ x: robot.x, y: robot.y }), 0n);
}
console.log(ship.size);



let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
for (const [key, _] of ship) {  
  const { x, y } = JSON.parse(key);
  minX = Math.min(minX, x);
  minY = Math.min(minY, y);
  maxX = Math.max(maxX, x);
  maxY = Math.max(maxY, y);
} 

for (let row = minY; row <= maxY; row++) {
  let line = "";
  for (let col = minX; col <= maxX; col++) {
    line += ship.get(JSON.stringify({ x: col, y: row })) === 1n ? "#" : " ";
  }
  console.log(line);
}