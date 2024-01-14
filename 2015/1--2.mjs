let input = `___`;

// input = `)`;
// input = `()())`;

let floor = 0;
let position = 0;
for (const instruction of input.trim().split("")) {
  position++;
  floor += instruction === "(" ? 1 : -1;
  if (floor === -1) break;
}
console.log(position);
