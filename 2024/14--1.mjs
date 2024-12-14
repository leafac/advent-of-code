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
let space = { x: 11, y: 7 };

input = `
`;
space = { x: 101, y: 103 };

const seconds = 100;

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
const spaceMidpoints = { x: (space.x - 1) / 2, y: (space.y - 1) / 2 };
const quadrants = [
  [0, 0],
  [0, 0],
];
for (const { p, v } of robots) {
  const ps = {
    x: (((p.x + v.x * seconds) % space.x) + space.x) % space.x,
    y: (((p.y + v.y * seconds) % space.y) + space.y) % space.y,
  };
  if (ps.x < spaceMidpoints.x) {
    if (ps.y < spaceMidpoints.y) quadrants[0][0]++;
    else if (ps.y > spaceMidpoints.y) quadrants[0][1]++;
  } else if (ps.x > spaceMidpoints.x) {
    if (ps.y < spaceMidpoints.y) quadrants[1][0]++;
    else if (ps.y > spaceMidpoints.y) quadrants[1][1]++;
  }
}
console.log(quadrants.flat().reduce((a, b) => a * b, 1));
