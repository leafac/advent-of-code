let input = `___`;

// input = `
// jqt: rhn xhk nvd
// rsh: frs pzl lsr
// xhk: hfx
// cmg: qnr nvd lhk bvb
// rhn: xhk bvb hfx
// bvb: xhk hfx
// pzl: lsr hfx nvd
// qnr: nvd
// ntq: jqt hfx bvb xhk
// nvd: lhk
// lsr: lhk
// rzs: qnr cmg lsr rsh
// frs: qnr lhk lsr
// `;

const nodes = new Set();
let edges = [];
for (const line of input.trim().split("\n")) {
  const [from, tos] = line.split(":");
  nodes.add(from);
  for (const to of tos.trim().split(" ")) {
    nodes.add(to);
    edges.push([from, to]);
  }
}

edges = edges.filter(
  (edge) => !["ntx--gmr", "ncg--gsk", "mrd--rjs"].includes(edge.join("--"))
);

const seenNodes = new Set();
const worklist = [[...nodes][0]];
while (worklist.length > 0) {
  const node = worklist.pop();
  if (seenNodes.has(node)) continue;
  seenNodes.add(node);
  for (const edge of edges) {
    const connectedNode =
      edge[0] === node ? edge[1] : edge[1] === node ? edge[0] : undefined;
    if (connectedNode === undefined) continue;
    worklist.push(connectedNode);
  }
}
console.log(seenNodes.size * (nodes.size - seenNodes.size));
