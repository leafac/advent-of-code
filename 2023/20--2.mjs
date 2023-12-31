import fs from "node:fs/promises";
import * as viz from "@viz-js/viz";
const graphviz = await viz.instance();
import * as mathjs from "mathjs";

let input = `
%ls -> gl
%rz -> vm, gl
broadcaster -> rz, fp, kv, fd
%ql -> bn
%bm -> hr, fj
%fp -> cc, gk
&lk -> nc
%xg -> gl, mz
%dg -> gk, mp
%zg -> ls, gl
%lg -> hr
%pt -> lg, hr
%sp -> mj
%ms -> gl, hx
%kj -> fl, gk
%bn -> rj, gk
%xc -> vq
%fl -> gk
%dh -> hr, nm
%jk -> gk, dg
%tf -> cb
%kd -> cm, nr
&hr -> hh, kv, xl, qq
%kv -> xr, hr
%hq -> ql
&fn -> nc
%vm -> gl, xn
%jh -> nr, kd
%mz -> dd
%tp -> hq
%cf -> nr
%gr -> jh
%jd -> hr, bm
%xr -> qq, hr
%cm -> nr, cf
&fh -> nc
%rb -> xl, hr
&nc -> rx
%mp -> gk, kj
&nr -> fd, gr, fn, cb, tf, xc, vq
&gl -> fh, xn, sp, mz, rz, mj, dd
%rj -> jk
&hh -> nc
%fd -> nr, df
&gk -> lk, tp, fp, ql, hq, rj
%fj -> pt, hr
%qq -> dh
%df -> nr, nv
%mj -> ms
%xn -> xg
%cc -> gk, tp
%nm -> rb, hr
%dd -> sp
%vq -> gr
%cb -> xc
%nv -> tf, nr
%xl -> jd
%hx -> gl, zg
`;

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
    {
      type: "button",
      name: "button",
      sourcesNames: [],
      destinationsNames: ["broadcaster"],
    },
  ],
  [
    "output",
    { type: "output", name: "output", sourcesNames: [], destinationsNames: [] },
  ],
  ["rx", { type: "rx", name: "rx", sourcesNames: [], destinationsNames: [] }],
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
          sourcesNames: [],
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
    destination.sourcesNames.push(module.name);
    if (destination?.type === "conjunction")
      destination.memory.set(module.name, "low");
  }
// console.log(modules);

// await fs.writeFile(
//   "20--2.svg",
//   graphviz.renderString(
//     `
//       digraph {
//         ${[...modules.values()]
//           .flatMap((module) =>
//             module.destinationsNames.map(
//               (destinationName) => `${module.name} -> ${destinationName};`
//             )
//           )
//           .join("\n")}
//       }
//     `,
//     { format: "svg" }
//   )
// );

const rxSources = new Set(
  modules.get(modules.get("rx").sourcesNames[0]).sourcesNames
);
// console.log(rxSources);

let cyclesLCM = 1;
let buttonPress = 0;
while (rxSources.size > 0) {
  buttonPress++;
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
    if (rxSources.has(module.name) && pulse === "high") {
      rxSources.delete(module.name);
      cyclesLCM = mathjs.lcm(cyclesLCM, buttonPress);
    }
    for (const destinationName of module.destinationsNames) {
      const destination = modules.get(destinationName);
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
console.log(cyclesLCM);
