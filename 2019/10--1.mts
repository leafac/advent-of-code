// Keep track of maxCount
// Iterate through each asteroid
// countVisible
//   iterate through each asteroid
//     calculate the simplest vector put it in a set
//   return length of set

const input = ``;

class Node {
  col: number;
  row: number;
}

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

let maxVisible = -1;
for (const node of nodes) {
  maxVisible = Math.max(maxVisible, countVisible(node));
}
console.log(maxVisible);

function countVisible(root: Node) {
  const vectors = new Set();
  for (const node of nodes) {
    const vector = primitiveVector(root, node);
    vectors.add(vector);
  }
  return vectors.size;
}

function primitiveVector(a: Node, b: Node) {
  return reduceFraction(a.col - b.col, a.row - b.row);
}

function gcd(a: number, b: number) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function reduceFraction(numerator: number, denominator: number) {
  if (numerator === 0 && denominator === 0) return "0:0";
  if (numerator === 0) return `0:1`;
  if (denominator === 0) return `1:0`;
  const divisor = gcd(numerator, denominator);
  return `${numerator / divisor}:${denominator / divisor}`;
}

// Old Approach 1:
// Keep track of maxCount
// Iterate through asteroids
//  countVisible
//   Init a "seen" matrix
//   BFS from the node (if it's not been seen)
//     * Increment the count
//     * Calculate the unit vector -> markRaySeen(unitVector)

// func unitVector(a, b)
//  return (a.x - b.x, a.y - b.y)
// func markRaySeen(unitVector)

// Distance from the station to the
// x dist - y dist, do the same for other
// if the ratios are the same -> yes it's blocking

// Ratio is the same as unit vector, your check is
// do these two have the same unit vector?
