const input = ``;

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

// Count the max visible asteroids
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
  return vectors.size - 1;
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
  if (numerator === 0) return denominator < 0 ? `0:-1` : `0:1`;
  if (denominator === 0) return numerator < 0 ? `-1:0` : `1:0`;
  const divisor = Math.abs(gcd(numerator, denominator));
  return `${numerator / divisor}:${denominator / divisor}`;
}
