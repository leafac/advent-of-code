let input = `
###
###
###
`;

// input = `
// ..#
// ...
// ..#
// `;

input = `
.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##
`;

input = `
`;

class Node {
  x: number;
  y: number;
}

// Parsed all the nodes in an array
const nodes: Node[] = [];
const lines = input.trim().split("\n");
for (let row = 0; row < lines.length; row++) {
  const line = lines[row];
  for (let col = 0; col < line.length; col++) {
    if (line[col] === "#") {
      const node = new Node();
      node.x = col;
      node.y = lines.length - 1 - row;
      nodes.push(node);
    }
  }
}

let maxMap = new Map<string, Array<{ asteroid: Node; distance: number }>>();
for (const station of nodes) {
  const map: typeof maxMap = new Map();
  for (const asteroid of nodes) {
    if (station === asteroid) continue;
    const key = (
      (Math.atan2(asteroid.y - station.y, asteroid.x - station.x) / Math.PI +
        1.49999) %
      2
    ).toFixed(4);
    const value = {
      asteroid,
      distance: Math.sqrt(
        (asteroid.x - station.x) ** 2 + (asteroid.y - station.y) ** 2
      ),
    };
    map.get(key)?.push(value) ?? map.set(key, [value]);
  }
  if (maxMap.size < map.size) maxMap = map;
}
for (const values of maxMap.values())
  values.sort(({ distance: a }, { distance: b }) => a - b);
const keys = [...maxMap.keys()].sort((a, b) => Number(b) - Number(a));

// console.log(keys);
// console.dir(maxMap, { depth: Infinity });

let keysIndex = 0;
for (
  let asteroidsDestroyedCount = 0;
  asteroidsDestroyedCount < 200 - 1;
  asteroidsDestroyedCount++
) {
  const key = keys[keysIndex];
  const asteroids = maxMap.get(key);
  if (asteroids === undefined) throw new Error();
  asteroids.shift();
  if (asteroids.length === 0) {
    maxMap.delete(key);
    keys.splice(keysIndex, 1);
  } else keysIndex++;
  keysIndex = keysIndex % keys.length;
}
const asteroids = maxMap.get(keys[keysIndex]);
if (asteroids === undefined) throw new Error();
const theOne = asteroids.shift();
if (theOne === undefined) throw new Error();
console.log(theOne);

console.log(theOne.asteroid.x * 100 + lines.length - 1 - theOne.asteroid.y);

// Compute the fraction
// Keep track which one is closes
// Remove from the list of nodes
// Start from the scratch
// Vector order, distance order
// Map<Vector, Array<Node>>
// How to iterate by angle?
// How do we sort the vectors?
