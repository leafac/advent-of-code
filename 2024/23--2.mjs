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

const connections = new Map();

for (const line of input.trim().split("\n")) {
  const [computer1, computer2] = line.split("-");
  connections.get(computer1)?.add(computer2) ??
    connections.set(computer1, new Set([computer2]));
  connections.get(computer2)?.add(computer1) ??
    connections.set(computer2, new Set([computer1]));
}

let largestSet = [];
(function step({ set, computers }) {
  if (computers.length === 0) {
    if (largestSet.length < set.length) largestSet = set;
    return;
  }
  const [computer, ...computersRest] = computers;
  if (
    set.every((otherComputer) => connections.get(otherComputer).has(computer))
  )
    step({ set: [...set, computer], computers: computersRest });
  step({ set, computers: computersRest });
})({
  set: [],
  computers: [...connections.keys()],
});
console.log([...largestSet].sort().join(","));
