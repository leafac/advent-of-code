const input = ``;

// Keep track of all the points in a set for wire 1
// Then for wire 2
// Then for each point in both sets -> calculate the manhattan distance
// Keep track of the minimum distance -> answer

const wire1 = input.trim().split("\n")[0].split(",");
const wire2 = input.trim().split("\n")[1].split(",");

function getPoints(wire: string[]) {
  const points = new Set<string>();
  let x = 0;
  let y = 0;
  for (const p of wire) {
    const dir = p[0];
    const len = parseInt(p.slice(1));
    for (let i = 0; i < len; i++) {
      if (dir === "R") {
        x++;
      } else if (dir === "L") {
        x--;
      } else if (dir === "U") {
        y++;
      } else if (dir === "D") {
        y--;
      }
      points.add(`${x},${y}`);
    }
  }
  return points;
}

const points1 = getPoints(wire1);
const points2 = getPoints(wire2);

const intersections = Array.from(points1).filter((p) => points2.has(p));

let minDistance = Infinity;
for (const p of intersections) {
  const [x, y] = p.split(",").map(Number);
  const distance = Math.abs(x) + Math.abs(y);
  minDistance = Math.min(minDistance, distance);
}

console.log(minDistance);