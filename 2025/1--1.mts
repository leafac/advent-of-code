const input = `
`;

const rotations = input
  .trim()
  .split("\n")
  .map((x) => ({ dir: x[0], dist: Number(x.slice(1)) }));

let current = 50;

let pwd = 0;

for (const r of rotations) {
  if (r.dir === "L") current -= r.dist;
  if (r.dir === "R") current += r.dist;
  while (current < 0) current += 100;
  while (100 <= current) current -= 100;
  if (current === 0) pwd++;
}

console.log(pwd);
