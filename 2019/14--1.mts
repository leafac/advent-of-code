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
for (const [chemical, {inputs}] of Object.entries(reactions)) {
  cumulativeInputs.set(
    chemical,
    // @ts-ignore
    (cumulativeInputs.get(chemical) || new Set()).union(
      new Set(inputs.map((x) => x.chemical))
    )
  );
}

console.log(cumulativeInputs)

let changed = true;
while (changed) {
  changed = false;
  for (const [c1, d1] of cumulativeInputs.entries()) {
    for (const [c2, d2] of cumulativeInputs.entries()) {
      if (d1.has(c2)) {
        const previousSize = d1.size
        
        // @ts-ignore
        cumulativeInputs.set(c1, d1.union(d2));
        
        if (cumulativeInputs.get(c1)!.size !== previousSize) changed = true
      }
    }
  }
}

console.log(cumulativeInputs)


// start at the end
// replace the things - simplify
// in terms of ORE

// Left & right
// start at the end
// replace the things - simplify
// in terms of ORE

// Left & right

/*

function compare(a, b) {
    if cache[a+b]: return cache[a+b]

    queue = [rootFormula]
    // FUEL = a, b

    cache[a+b] = ret
    return ret
}


topologicalSort(formula) {
    const dependencies = Record<string, Set> = {}

    for f in formula:
        deps[f.chemical].add(...f.children)
        for d in deps:
            if d.has(f.chemical):
                d.add(...f.children)

    

    return nodes.sort((a, b) => {
        // return getOrder(a) - getOrder(b)
        return dependencies[a].includes(b) ? 1 : dependencies[b].includes(a) ? -1 : 0
    })
}

-------


function simplify(node):
    if node.chemical == ORE: 
        state["ORE"] += node.count
        return

    node.count -= minmax(state[node.chemical].count)
    if node.count == 0: return

    formula = get(node.chemical)
    for child in formula.children:
        simplify(child)

    assert formula.count > node.count
    state[node.chemical] += formula.count - node.count

    return state["ORE"]


Node
    

Math.ceil(definition.count / node.count) * node.count

10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL

{FUEL, 1}
    rec(7A)
        {A, 7}
        




10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
10 ORE, 10 ORE, 1 D  => 1 FUEL


10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
28 A, 1 B => 1 FUEL


*/
