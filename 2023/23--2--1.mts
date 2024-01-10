let input: string;

input = `___`;

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
// #.#####
// #.....#
// #.....#
// #.....#
// #####.#
// `;

// input = `
// #.########
// #....#####
// #.##.#####
// #........#
// ##.#####.#
// ##.......#
// ########.#
// `;

const board: string[][] = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

function inBounds(r: number, c: number) {
  return r >= 0 && r < board.length && c >= 0 && c < board[0].length;
}

let output: HTMLElement | null = null;
function visualizePath(path: Array<string>) {
  if (output) output.remove();
  output = document.createElement("div");
  output.style.display = "flex";
  output.style.flexDirection = "column";

  const cellDimensions = 90;

  const columnNumbers = document.createElement("div");
  for (let c = 0; c < board[0].length; c++) {
    // Add column number
    const cell = document.createElement("div");
    cell.style.width = `${cellDimensions}px`;
    cell.style.height = `${cellDimensions}px`;
    cell.style.border = "1px solid #333";
    cell.style.backgroundColor = "white";
    cell.style.textAlign = "center";
    cell.innerText = `${c}`;
    columnNumbers.appendChild(cell);
  }
  columnNumbers.style.display = "flex";
  output.appendChild(columnNumbers);

  for (let r = 0; r < board.length; r++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    for (let c = 0; c < board[0].length; c++) {
      const cell = document.createElement("div");
      cell.style.width = `${cellDimensions}px`;
      cell.style.height = `${cellDimensions}px`;
      cell.style.border = "1px solid #333";
      cell.style.backgroundColor = board[r][c] === "#" ? "#333" : "white";
      if (path.includes(`${r},${c}`)) {
        cell.style.backgroundColor = "crimson";
        cell.innerText = path.indexOf(`${r},${c}`) + "";
      }
      cell.style.display = "flex";
      cell.style.textAlign = "center";
      cell.style.justifyContent = "center";
      cell.style.alignItems = "center";
      row.appendChild(cell);
    }
    output.appendChild(row);
  }
  document.body.appendChild(output);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Direction = "^" | ">" | "v" | "<";

class PathNode {
  r: number;
  c: number;
  path: Set<string>;
  prevDirection: Direction | undefined;

  constructor(
    r: number,
    c: number,
    path: Set<string>,
    prevDirection: Direction | undefined
  ) {
    this.r = r;
    this.c = c;
    this.path = path;
    this.prevDirection = prevDirection;
  }

  get positionKey(): string {
    return `${this.r},${this.c}`;
  }
}

async function main() {
  const seen = new Set<string>();

  const junctionNodes = new Set<string>();

  const recurse = async (node: PathNode) => {
    const { r, c } = node;

    const newPath = new Set(node.path);
    newPath.add(node.positionKey);

    const up = new PathNode(r - 1, c, newPath, "^");
    const down = new PathNode(r + 1, c, newPath, "v");
    const left = new PathNode(r, c - 1, newPath, "<");
    const right = new PathNode(r, c + 1, newPath, ">");
    const options = [up, down, left, right].filter((x) => {
      // Avoid us going back the way we came
      if (node.path.has(x.positionKey)) {
        return false;
      }

      if (!inBounds(x.r, x.c)) {
        return false;
      }

      // Wall
      if (board[x.r][x.c] === "#") {
        return false;
      }

      return true;
    });

    if (options.length > 1) {
      junctionNodes.add(node.positionKey);
    }
    for (const option of options) {
      if (seen.has(option.positionKey)) {
        continue;
      }
      seen.add(option.positionKey);

      await recurse(option);
    }
  };

  const startNode = new PathNode(0, 1, new Set<string>(), undefined);
  console.log("Result", await recurse(startNode));

  junctionNodes.add(startNode.positionKey);
  const endNodePositionKey = `${board.length - 1},${board[0].length - 2}`;
  junctionNodes.add(endNodePositionKey);

  // Now find all the connected nodes for each junction node
  const junctionNodesGraphs = new Map<string, Map<string, number>>(
    [...junctionNodes].map((x) => [x, new Map<string, number>()])
  );
  for (const junctionNode of junctionNodes) {
    const seen = new Set<string>();
    const populateJunctionNodesGraph = (
      startNode: string,
      node: string,
      distance: number
    ) => {
      if (seen.has(node)) {
        return;
      }
      seen.add(node);

      if (node !== startNode && junctionNodes.has(node)) {
        junctionNodesGraphs.get(startNode)!.set(node, distance);
        return;
      }

      const [r, c] = node.split(",").map(Number);

      const up = `${r - 1},${c}`;
      const down = `${r + 1},${c}`;
      const left = `${r},${c - 1}`;
      const right = `${r},${c + 1}`;
      const options = [up, down, left, right].filter((x) => {
        if (!inBounds(r, c)) {
          return false;
        }

        // Wall
        if (board[r][c] === "#") {
          return false;
        }

        return true;
      });

      for (const option of options) {
        populateJunctionNodesGraph(startNode, option, distance + 1);
      }
    };
    populateJunctionNodesGraph(junctionNode, junctionNode, 0);
  }

  console.log("input", input);
  console.log("junctionNodes", junctionNodes);
  console.log("junctionNodesGraphs", junctionNodesGraphs);

  // Now find the longest path from start to end, negate all the distances so we can use Djikstra's
  let minDistance = Infinity;
  let minPath: Array<string> = [];
  let openList = [
    { position: startNode.positionKey, distance: 0, path: [] as string[] },
  ];
  while (openList.length > 0) {
    openList = openList.sort((a, b) => a.distance - b.distance);
    const current = openList.shift()!;
    if (current.position === endNodePositionKey) {
      if (current.distance < minDistance) {
        console.log("Found new longest path", Math.abs(current.distance));
        minDistance = current.distance;
        minPath = current.path;
      }
      continue;
    }

    const path = [...current.path, current.position];

    for (const [next, distance] of junctionNodesGraphs
      .get(current.position)!
      .entries()) {
      if (path.includes(next)) {
        continue;
      }

      openList.push({
        position: next,
        distance: current.distance - distance,
        path,
      });
    }
  }
  console.log("Final answer", Math.abs(minDistance));
  // visualizePath(minPath);
}
main();