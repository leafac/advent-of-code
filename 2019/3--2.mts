const input = ``;

// Keep track of all the points in a set for wire 1
// Then for wire 2
// Then for each point in both sets -> calculate the manhattan distance
// Keep track of the minimum distance -> answer

const wire1 = input.trim().split("\n")[0].split(",");
const wire2 = input.trim().split("\n")[1].split(",");

function getPoints(wire: string[]) {
  const points = new Map<string, number>();
  let x = 0;
  let y = 0;
  let d = 0;
  for (const p of wire) {
    const dir = p[0];
    const len = parseInt(p.slice(1));
    for (let i = 0; i < len; i++) {
      d++;
      if (dir === "R") {
        x++;
      } else if (dir === "L") {
        x--;
      } else if (dir === "U") {
        y++;
      } else if (dir === "D") {
        y--;
      }
      if (!points.has(`${x},${y}`)) {
        points.set(`${x},${y}`, d);
      }
    }
  }
  return points;
}

const points1 = getPoints(wire1);
const points2 = getPoints(wire2);

const intersections: number[] = [];
for (const p of points1.keys()) {
  if (points2.has(p)) {
    intersections.push(points1.get(p)! + points2.get(p)!);
  }
}

let minDistance = Infinity;
for (const p of intersections) {
  minDistance = Math.min(minDistance, p);
}

console.log(minDistance);
