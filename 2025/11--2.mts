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

input = `
svr: dac fft out
dac: fft out
fft: out
`;

const graph = new Map<string, Set<string>>();
for (const line of input.trim().split("\n")) {
  const [from, tos] = line.trim().split(":");
  graph.set(from, new Set(tos.trim().split(" ")));
}

type Graph = typeof graph;

function topological(graph: Graph): Map<string, number> {
  const inverse: Graph = new Map();
  for (const [n, children] of graph.entries()) {
    for (const child of children) {
      const iChildren = inverse.get(child) || new Set();
      iChildren.add(n);
    }
  }
  const ret: Map<string, number> = new Map();
  const queue = [["svr", 0] as [string, number]];
  while (queue.length) {
    const [node, d] = queue.shift()!;
    ret.set(node, d);
    const children = graph.get(node) || new Set();
    for (const child of children) {
      inverse.get(child)?.delete(node);
      if ((inverse.get(child)?.size || 0) === 0) {
        if (!queue.find((x) => x[0] === child)) queue.push([child, d + 1]);
      }
    }
  }
  return ret;
}

const t = topological(graph);

console.log(graph);
console.log(JSON.stringify(Object.fromEntries(t.entries()), null, 2));

const subAnswers = new Map<string, number>()

function dfs(node: string, target = "fft"): number {
  if ((t.get(node) ?? Infinity) > t.get(target)!) return 0;
  if (node === "out") return 1;
  if (node === "dac") target = "out";
  if (node === "fft") target = "dac";
  if (subAnswers.has(node)) return subAnswers.get(node)!
  let sum = 0;
  for (const child of graph.get(node)!) {
    sum += dfs(child, target);
  }
  subAnswers.set(node, sum)
  return sum;
}

console.log(dfs("svr"));
