import * as intcode from "./13--intcode.mts";

const machine = intcode.newMachine({
  memory:
    "2,...",
});

machine.input = {
  shift: () => {
    onRead();

    if (paddleX < ballX) return 1;
    if (paddleX > ballX) return -1;

    return 0;
  },
} as any;

let blocks = 0;

const grid: Array<Array<number>> = [];

const ID = {
  0: " ",
  1: ".",
  2: "#",
  3: "_",
  4: "*",
};

let paddleX = 0;
let ballX = 0;

function onRead() {
  // Populate the walls and the blocks
  for (let i = 0; i < machine.output.length; i += 3) {
    const x = Number(machine.output[i]);
    const y = Number(machine.output[i + 1]);
    const id = Number(machine.output[i + 2]);
    if (!grid[y]) grid[y] = [];
    grid[y][x] = ID[id];
    if (ID[id] === "*") ballX = x;
    if (ID[id] === "_") paddleX = x;
    if (x === -1 && y === 0) console.log("🔥 New High Score 🎉", id);
  }
  machine.output.length = 0;

  for (const r of grid) {
    console.log(r.join(""));
  }
}

intcode.run(machine);

onRead();

// 1. 2 position 0
// 2. ask for inputs
// 3. break blocks, what is the 2d map
// 4. strategy
// 5. when all blocks are broken

// Basic strategy:
// * Workout the x coordinate ball, the x coordinate of the paddle
// * sub(x1,x2) > 0: output -> -1,1
