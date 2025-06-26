let input = `
157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT
`;
// 82892753

input = `
2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF
`;
// 5586022

input = `
171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX
`;
// 460664

let reactions: Record<
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

// for (const [output, { inputs }] of Object.entries(reactions))
//   for (const { chemical: input } of inputs)
//     console.log(`${input} -> ${output};`);

const transitiveClosure: Map<string, Set<string>> = new Map([
  ["ORE", new Set()],
]);
for (const [chemical, { inputs }] of Object.entries(reactions)) {
  transitiveClosure.set(
    chemical,
    // @ts-ignore
    (transitiveClosure.get(chemical) || new Set()).union(
      new Set(inputs.map((x) => x.chemical))
    )
  );
}

// console.log(transitiveClosure);

// while (true) {
for (let iteration = 0; iteration < 1_000_000; iteration++) {
  let previousSize = 0;
  for (const value of transitiveClosure.values()) previousSize += value.size;
  for (const c1 of transitiveClosure.keys()) {
    for (const c2 of transitiveClosure.keys()) {
      if (transitiveClosure.get(c1)!.has(c2)) {
        transitiveClosure.set(
          c1,
          // @ts-ignore
          transitiveClosure.get(c1)!.union(transitiveClosure.get(c2)!)
        );
      }
    }
  }
  let currentSize = 0;
  for (const value of transitiveClosure.values()) currentSize += value.size;
  if (previousSize === currentSize) break;
}

// console.log(transitiveClosure.get("BPHZ"));
// console.log(transitiveClosure);
type Dependency = {
  chemical: string;
  amount: number;
};
type Dependencies = Dependency[];

function solve(): number {
  let dependencies = reactions["FUEL"].inputs;
  // if (reactions["FUEL"].outputAmount !== 1) {
  //   throw new Error('["FUEL"].outputAmount !== 1)');
  // }

  while (true) {
    if (dependencies.length === 1 && dependencies[0].chemical === "ORE") {
      return dependencies[0].amount;
    }

    const idx = pick(dependencies);

    const [picked] = dependencies.splice(idx, 1);
    // console.log(picked);
    dependencies = combine([...replace(picked), ...dependencies]);
  }
}

let fuelLowerBound = 1;
let fuelUpperBound = 1_000_000_000_000 / 10;
while (true) {
  const fuel = Math.floor((fuelLowerBound + fuelUpperBound) / 2);
  const originalReactions = JSON.parse(JSON.stringify(reactions));
  for (const input of reactions["FUEL"].inputs) input.amount *= fuel;
  reactions["FUEL"].outputAmount *= fuel;
  const solution = solve();
  reactions = originalReactions;
  if (solution < 1_000_000_000_000) fuelLowerBound = fuel + 1;
  else fuelUpperBound = fuel - 1;
  console.log(solution, fuelLowerBound, fuelUpperBound);
  if (fuelUpperBound <= fuelLowerBound) {
    console.log("--------");
    console.log("Your answer may be one more or less than the output 🤷‍♂️");
    console.log(fuelUpperBound);
    console.log("--------");
    break;
  }
}

function pick(d: Dependencies) {
  // Find the one which is not in the dependencies of any other
  const result: Dependencies = [d[0]];
  for (let i = 0; i < d.length; i++) {
    let isOkay = true;
    for (let j = 0; j < d.length; j++) {
      if (i == j) continue;
      if (transitiveClosure.get(d[j].chemical)!.has(d[i].chemical)) {
        isOkay = false;
      }
    }
    if (isOkay) return i;
  }

  throw new Error("asdf");
}

function combine(d: Dependencies) {
  // console.log(d);
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
  const reaction = reactions[d.chemical];
  const mul = Math.ceil(d.amount / reaction.outputAmount);
  return reaction.inputs.map((x) => ({
    ...x,
    amount: mul * x.amount,
  }));
}
