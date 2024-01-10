// https://viz-js.com/
// Use network tab to grab the SVG
// Or, you know, install Graphviz 🤷‍♂️

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

console.log("graph {");
for (const line of input.trim().split("\n")) {
  const [from, tos] = line.split(":");
  for (const to of tos.trim().split(" ")) console.log(`${from} -- ${to} [label="${from} -- ${to}"];`);
}
console.log("}");
