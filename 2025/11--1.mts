let input = `
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
`;

const graph = new Map<string, Set<string>>();
for (const line of input.trim().split("\n")) {
  const [from, tos] = line.trim().split(":");
  graph.set(from, new Set(tos.trim().split(" ")));
}

console.log(
  (function search(node) {
    if (node === "out") return 1;
    const tos = graph.get(node);
    if (tos === undefined) return 0;
    let paths = 0;
    for (const to of tos) paths += search(to);
    return paths;
  })("you")
);
