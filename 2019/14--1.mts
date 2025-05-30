let input = `
10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL
`;

const reactions: Record<
  string,
  { outputAmount: number; inputs: Array<{ chemical: string; amount: number }> }
> = {};
for (const line of input.trim().split("\n")) {
  const [inputsString, outputString] = line.split("=>");
  const [outputAmountString, outputChemical] = outputString.trim().split(" ");
  const inputs = inputsString.split(", ").map((x) => {
    const y = x.trim().split(" ");
    return { chemical: y[1], amount: Number(y[0]) };
  });
  reactions[outputChemical] = {
    outputAmount: Number(outputAmountString),
    inputs,
  };
}

const cumulativeInputs: Map<string, Set<string>> = new Map();
for (const [chemical, { inputs }] of Object.entries(reactions)) {
  cumulativeInputs.set(
    chemical,
    // @ts-ignore
    (cumulativeInputs.get(chemical) || new Set()).union(
      new Set(inputs.map((x) => x.chemical))
    )
  );
}

console.log(cumulativeInputs);

let changed = true;
while (changed) {
  changed = false;
  for (const [c1, d1] of cumulativeInputs.entries()) {
    for (const [c2, d2] of cumulativeInputs.entries()) {
      if (d1.has(c2)) {
        const previousSize = d1.size;

        // @ts-ignore
        cumulativeInputs.set(c1, d1.union(d2));

        if (cumulativeInputs.get(c1)!.size !== previousSize) changed = true;
      }
    }
  }
}

console.log(cumulativeInputs);

type Dependency = {
  chemical: string;
  amount: number;
};
type Dependencies = Dependency[];

function solve(): number {
  let dependencies = reactions["FUEL"].inputs;
  if (reactions["FUEL"].outputAmount !== 1) {
    throw new Error('["FUEL"].outputAmount !== 1)');
  }

  while (true) {
    if (dependencies.length === 1 && dependencies[0].chemical === "ORE") {
      return dependencies[0].amount;
    }

    sort(dependencies);

    const [first, ...rest] = dependencies;
    dependencies = combine([...replace(first), ...rest]);
  }
}

console.log(solve())

function sort(d: Dependencies) {
  return d.sort((a, b) => {
    return cumulativeInputs.get(a.chemical)!.has(b.chemical)
      ? -1
      : cumulativeInputs.get(b.chemical)!.has(a.chemical)
      ? 1
      : 0;
  });
}

function combine(d: Dependencies) {
  console.log(d)
  const d2: Dependencies = [];
  for (const dep of d) {
    const existing = d2.find((x) => x.chemical === dep.chemical);
    if (existing) {
      existing.amount += dep.amount;
    } else {
      d2.push(dep);
    }
  }
  return d2;
}

function replace(d: Dependency): Dependencies {
  if (d.chemical === "ORE") {
    return [d]
  }
  
  const reaction = reactions[d.chemical];
  const mul = Math.ceil(d.amount / reaction.outputAmount);
  return reaction.inputs.map((x) => ({
    ...x,
    amount: mul * x.amount,
  }));
}
