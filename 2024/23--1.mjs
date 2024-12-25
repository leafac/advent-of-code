let input = `
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
`;

const computers = [];
const connections = new Map();

for (const line of input.trim().split("\n")) {
  const [computer1, computer2] = line.split("-");
  computers.push(computer1);
  computers.push(computer2);
  connections.get(computer1)?.push(computer2) ??
    connections.set(computer1, [computer2]);
  connections.get(computer2)?.push(computer1) ??
    connections.set(computer2, [computer1]);
}

let sets = new Set();
for (const computer1 of computers)
  if (computer1.startsWith("t"))
    for (const computer2 of connections.get(computer1))
      for (const computer3 of connections.get(computer2))
        if (connections.get(computer1).includes(computer3)) {
          sets.add(JSON.stringify([computer1, computer2, computer3].sort()));
        }
console.log(sets.size);
