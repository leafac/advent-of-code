import { intern as $ } from "@radically-straightforward/utilities";

let input = `___`;

// input = `
// #.#####################
// #.......#########...###
// #######.#########.#.###
// ###.....#.>.>.###.#.###
// ###v#####.#v#.###.#.###
// ###.>...#.#.#.....#...#
// ###v###.#.#.#########.#
// ###...#.#.#.......#...#
// #####.#.#.#######.#.###
// #.....#.#.#.......#...#
// #.#####.#.#.#########v#
// #.#...#...#...###...>.#
// #.#.#v#######v###.###v#
// #...#.>.#...>.>.#.###.#
// #####v#.#.###v#.#.###.#
// #.....#...#...#.#.#...#
// #.#########.###.#.#.###
// #...###...#...#...#.###
// ###.###.#.###v#####v###
// #...#...#.#.>.>.#.>.###
// #.###.###.#.###.#.#v###
// #.....###...###...#...#
// #####################.#
// `;

// input = `
// #.###
// #...#
// #.#.#
// #...#
// ###.#
// `;

const map = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const start = $({ x: 1, y: 0 });
const end = $({ x: map[0].length - 2, y: map.length - 1 });

const nodes = new Set();
const edges = new Set();
{
  const worklist = [{ position: start, node: start, steps: 0 }];
  const visited = new Set();
  while (worklist.length > 0) {
    const previous = worklist.pop();
    const visitedKey = $({ position: previous.position, node: previous.node });
    if (visited.has(visitedKey)) continue;
    visited.add(visitedKey);
    const positions = [
      $({ x: previous.position.x + 0, y: previous.position.y - 1 }),
      $({ x: previous.position.x + 1, y: previous.position.y + 0 }),
      $({ x: previous.position.x + 0, y: previous.position.y + 1 }),
      $({ x: previous.position.x - 1, y: previous.position.y + 0 }),
    ].filter(
      (position) =>
        0 <= position.x &&
        position.x < map[0].length &&
        0 <= position.y &&
        position.y < map.length &&
        map[position.y][position.x] !== "#"
    );
    let node;
    let steps;
    if (positions.length === 2) {
      node = previous.node;
      steps = previous.steps + 1;
    } else {
      node = previous.position;
      steps = 1;
      nodes.add(node);
      if (previous.node !== node)
        edges.add(
          $({
            nodes: $(
              [previous.node, node].sort((nodeA, nodeB) =>
                nodeA.x !== nodeB.x ? nodeA.x - nodeB.x : nodeA.y - nodeB.y
              )
            ),
            steps: previous.steps,
          })
        );
    }
    worklist.push(...positions.map((position) => ({ position, node, steps })));
  }
}

let maximumSteps = 0;
{
  const worklist = [{ node: start, path: [], steps: 0 }];
  while (worklist.length > 0) {
    const previous = worklist.pop();
    if (previous.path.includes(previous.node)) continue;
    if (previous.node === end)
      maximumSteps = Math.max(maximumSteps, previous.steps);
    const path = [...previous.path, previous.node];
    for (const edge of edges) {
      const node =
        edge.nodes[0] === previous.node
          ? edge.nodes[1]
          : edge.nodes[1] === previous.node
          ? edge.nodes[0]
          : undefined;
      if (node !== undefined)
        worklist.push({
          node,
          path,
          steps: previous.steps + edge.steps,
        });
    }
  }
}
console.log(maximumSteps);
