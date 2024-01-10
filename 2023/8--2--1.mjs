import * as mathjs from "mathjs";

// const input = `
// LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)
// `;

const input = `___`;

const [directionsString, graphString] = input.trim().split("\n\n");
const directions = directionsString
  .split("")
  .map((directionString) => ({ L: "left", R: "right" }[directionString]));
const graph = Object.fromEntries(
  graphString
    .trim()
    .split("\n")
    .map((line) => {
      const match = line.match(
        /^(?<from>.*?) = \((?<toLeft>.*?), (?<toRight>.*?)\)$/
      );
      return [
        match.groups.from,
        { left: match.groups.toLeft, right: match.groups.toRight },
      ];
    })
);

const nodes = Object.keys(graph).filter((node) => node.endsWith("A"));
// console.log(nodes);

const cycles = [];
for (let node of nodes) {
  // console.log(node);
  const states = [];
  const endStates = [];
  let cycleState;
  let steps = 0;
  while (true) {
    const directionIndex = steps % directions.length;
    const state = JSON.stringify({ node, directionIndex });
    if (states.includes(state)) {
      cycleState = state;
      break;
    }
    states.push(state);
    if (node.endsWith("Z")) endStates.push(state);
    node = graph[node][directions[directionIndex]];
    steps++;
  }
  // // console.log(states);
  // console.log(states.length);
  // // console.log(endStates);
  // console.log(endStates.map((endState) => states.indexOf(endState)));
  // // console.log(cycleState);
  // console.log(states.indexOf(cycleState));
  // console.log();
  cycles.push({
    startOffset: states.indexOf(cycleState),
    length: states.length - states.indexOf(cycleState),
  });
}

// console.log(cycles);

// console.log(
//   cycles.reduce((cycleA, cycleB) => {
//     console.log(cycleA.length);
//     console.log(cycleB.length);
//     let cycleCount = 1;
//     while (
//       (cycleA.length * cycleCount) % cycleB.length !==
//       Math.abs(cycleA.startOffset - cycleB.startOffset)
//     )
//       cycleCount++;
//     console.log(cycleCount);
//     console.log();
//     return {
//       startOffset: 0,
//       length: cycleA.length * cycleCount,
//     };
//   }).length
// );

console.log(mathjs.lcm(...cycles.map((cycle) => cycle.length)));
