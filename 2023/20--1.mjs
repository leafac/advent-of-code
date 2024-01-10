let input = `___`;

// input = `
// broadcaster -> a, b, c
// %a -> b
// %b -> c
// %c -> inv
// &inv -> a
// `;

// input = `
// broadcaster -> a
// %a -> inv, con
// &inv -> b
// %b -> con
// &con -> output
// `;

const modules = new Map([
  [
    "button",
    { type: "button", name: "button", destinationsNames: ["broadcaster"] },
  ],
  ["output", { type: "output", name: "output", destinationsNames: [] }],
  ["rx", { type: "rx", name: "rx", destinationsNames: [] }],
  ...input
    .trim()
    .split("\n")
    .map((line) => {
      let [name, destinationsNames] = line.split("->");
      name = name.trim();
      let type;
      if (name.startsWith("%")) {
        type = "flip-flop";
        name = name.slice(1);
      } else if (name.startsWith("&")) {
        type = "conjunction";
        name = name.slice(1);
      } else type = name;
      destinationsNames = destinationsNames
        .split(",")
        .map((destinationName) => destinationName.trim());
      return [
        name,
        {
          type,
          name,
          destinationsNames,
          ...(type === "flip-flop"
            ? { state: "off" }
            : type === "conjunction"
            ? { memory: new Map() }
            : {}),
        },
      ];
    }),
]);
for (const module of modules.values())
  for (const destinationName of module.destinationsNames) {
    const destination = modules.get(destinationName);
    if (destination?.type === "conjunction")
      destination.memory.set(module.name, "low");
  }
// console.log(modules);

let lows = 0;
let highs = 0;
for (let buttonPress = 1; buttonPress <= 1000; buttonPress++) {
  // console.log();
  // console.log(buttonPress);
  // console.log();
  const worklist = ["button"];
  while (worklist.length > 0) {
    const module = modules.get(worklist.shift());
    const pulse =
      module.type === "flip-flop"
        ? module.state === "on"
          ? "high"
          : "low"
        : module.type === "conjunction"
        ? [...module.memory.values()].every((pulse) => pulse === "high")
          ? "low"
          : "high"
        : "low";
    for (const destinationName of module.destinationsNames) {
      const destination = modules.get(destinationName);
      if (pulse === "high") highs++;
      else lows++;
      // console.log(`${module.name} -${pulse}-> ${destination.name}`);
      switch (destination.type) {
        case "broadcaster":
          worklist.push(destination.name);
          break;
        case "flip-flop":
          if (pulse === "high") break;
          destination.state = destination.state === "on" ? "off" : "on";
          worklist.push(destination.name);
          break;
        case "conjunction":
          destination.memory.set(module.name, pulse);
          worklist.push(destination.name);
          break;
      }
    }
  }
}

console.log(highs * lows);
