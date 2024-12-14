// $ node 14--2.mjs > 14--2.txt
// Open 14--2.txt in a text editor that can manage huge files, and look for a bunch of # in a row.

let input = `
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
`;
// input = `
// p=2,4 v=2,-3
// `;
let space = { x: 11, y: 7 };

input = `
`;
space = { x: 101, y: 103 };

const seconds = space.x * space.y + 1000;

const robots = input
  .trim()
  .split("\n")
  .map((line) => {
    const groups = line.match(
      /p=(?<px>[0-9]+),(?<py>[0-9]+) v=(?<vx>-?[0-9]+),(?<vy>-?[0-9]+)/
    ).groups;
    return {
      p: { x: Number(groups.px), y: Number(groups.py) },
      v: { x: Number(groups.vx), y: Number(groups.vy) },
    };
  });
for (let second = 0; second <= seconds; second++) {
  const grid = Array.from({ length: space.y }, () =>
    Array.from({ length: space.x }, () => ".")
  );
  for (const { p, v } of robots) {
    grid[p.y][p.x] = "#";
    p.x += v.x;
    while (p.x < 0) p.x += space.x;
    while (space.x <= p.x) p.x -= space.x;
    p.y += v.y;
    while (p.y < 0) p.y += space.y;
    while (space.y <= p.y) p.y -= space.y;
  }
  console.log(second);
  console.log(grid.map((line) => line.join("")).join("\n"));
}
