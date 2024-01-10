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

for (let edge1Index = 0; edge1Index < edges.length; edge1Index++)
  for (let edge2Index = edge1Index + 1; edge2Index < edges.length; edge2Index++)
    for (
      let edge3Index = edge2Index + 1;
      edge3Index < edges.length;
      edge3Index++
    ) {
      const disconnectedGraphCandidateEdges = [
        ...edges.slice(0, edge1Index),
        ...edges.slice(edge1Index + 1, edge2Index),
        ...edges.slice(edge2Index + 1, edge3Index),
        ...edges.slice(edge3Index + 1),
      ];
      const seenNodes = new Set();
      const worklist = [[...nodes][0]];
      while (worklist.length > 0) {
        const node = worklist.pop();
        if (seenNodes.has(node)) continue;
        seenNodes.add(node);
        for (const edge of disconnectedGraphCandidateEdges) {
          const connectedNode =
            edge[0] === node ? edge[1] : edge[1] === node ? edge[0] : undefined;
          if (connectedNode === undefined) continue;
          worklist.push(connectedNode);
        }
      }
      if (nodes.size !== seenNodes.size) {
        console.log(seenNodes.size * (nodes.size - seenNodes.size));
        process.exit(0);
      }
    }
