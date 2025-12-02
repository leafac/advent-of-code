let input = ``;

const rotations = input
  .trim()
  .split("\n")
  .map((x) => ({ dir: x[0], dist: Number(x.slice(1)) }));

let current = 50;

let pwd = 0;

for (const r of rotations)
  for (let click = 0; click < r.dist; click++) {
    current += r.dir === "L" ? -1 : 1;
    if (current === 100) current = 0;
    if (current === -1) current = 99;
    if (current === 0) pwd++;
  }

console.log(pwd);
