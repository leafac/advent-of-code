const input = `
###
###
###
`;

class Node {
  col: number;
  row: number;
}

// Parsed all the nodes in an array
const nodes: Node[] = [];
const lines = input.trim().split("\n");
for (let row = 0; row < lines.length; row++) {
  const line = lines[row];
  for (let col = 0; col < line.length; col++) {
    if (line[col] === "#") {
      const node = new Node();
      node.col = col;
      node.row = row;
      nodes.push(node);
    }
  }
}

let maxMap = new Map<string, Array<{ asteroid: Node; distance: number }>>();
for (const station of nodes) {
  const map: typeof maxMap = new Map();
  for (const asteroid of nodes) {
    if (station === asteroid) continue;
    const key = Math.atan2(
      asteroid.row - station.row,
      asteroid.col - station.col
    ).toFixed(4);
    const value = {
      asteroid,
      distance: Math.sqrt(
        (asteroid.row - station.row) ** 2 + (asteroid.col - station.col) ** 2
      ),
    };
    map.get(key)?.push(value) ?? map.set(key, [value]);
  }
  if (maxMap.size < map.size) maxMap = map;
}
for (const values of maxMap.values())
  values.sort(({ distance: a }, { distance: b }) => a - b);
const angles = [...maxMap.keys()].sort((a, b) => Number(a) - Number(b));


// Compute the fraction
// Keep track which one is closes
// Remove from the list of nodes
// Start from the scratch
// Vector order, distance order
// Map<Vector, Array<Node>>
// How to iterate by angle?
// How do we sort the vectors?
