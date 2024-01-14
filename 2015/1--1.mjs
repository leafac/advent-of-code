let input = `___`;

// input = `(((`;

let floor = 0;
for (const instruction of input.trim().split(""))
  floor += instruction === "(" ? 1 : -1;
console.log(floor);
