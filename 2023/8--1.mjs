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

let node = "AAA";
let steps = 0;
while (node !== "ZZZ") {
  node = graph[node][directions[steps % directions.length]];
  steps++;
}
console.log(steps);
