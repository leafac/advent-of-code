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
const edges = [];
for (const line of input.trim().split("\n")) {
  const [from, tos] = line.split(":");
  nodes.add(from);
  for (const to of tos.trim().split(" ")) {
    nodes.add(to);
    edges.push([from, to]);
  }
}

const edgesUsesCounts = new Map();
for (const edge of edges) edgesUsesCounts.set(edge, 0);
for (const node of nodes) {
  const worklist = [{ node, usedEdges: [] }];
  const visitedNodes = new Set();
  while (worklist.length > 0) {
    worklist.sort(
      (stateA, stateB) => stateB.usedEdges.length - stateA.usedEdges.length
    );
    const state = worklist.pop();
    if (visitedNodes.has(state.node)) continue;
    visitedNodes.add(state.node);
    for (const edge of state.usedEdges)
      edgesUsesCounts.set(edge, edgesUsesCounts.get(edge) + 1);
    for (const edge of edges) {
      const connectedNode =
        edge[0] === state.node
          ? edge[1]
          : edge[1] === state.node
          ? edge[0]
          : undefined;
      if (connectedNode === undefined) continue;
      worklist.push({
        node: connectedNode,
        usedEdges: [...state.usedEdges, edge],
      });
    }
  }
}

const partitionedEdges = [...edgesUsesCounts.entries()]
  .sort((entryA, entryB) => entryB[1] - entryA[1])
  .slice(3)
  .map(([edge]) => edge);

const nodesInPartition = new Set();
const worklist = [[...nodes][0]];
while (worklist.length > 0) {
  const node = worklist.pop();
  if (nodesInPartition.has(node)) continue;
  nodesInPartition.add(node);
  for (const edge of partitionedEdges) {
    const connectedNode =
      edge[0] === node ? edge[1] : edge[1] === node ? edge[0] : undefined;
    if (connectedNode === undefined) continue;
    worklist.push(connectedNode);
  }
}
console.log(nodesInPartition.size * (nodes.size - nodesInPartition.size));
