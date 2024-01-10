for (const input of [
  // Real input
  `___`,

  // ↻ · Quadrant 1
  `
U 2 (#000000)
R 2 (#000000)
D 2 (#000000)
L 2 (#000000)
`,

  // ↻ · Quadrant 2
  `
L 2 (#000000)
U 2 (#000000)
R 2 (#000000)
D 2 (#000000)
`,

  // ↻ · Quadrant 3
  `
D 2 (#000000)
L 2 (#000000)
U 2 (#000000)
R 2 (#000000)
`,

  // ↻ · Quadrant 4
  `
R 2 (#000000)
D 2 (#000000)
L 2 (#000000)
U 2 (#000000)
`,

  // ↺ · Quadrant 1
  `
R 2 (#000000)
U 2 (#000000)
L 2 (#000000)
D 2 (#000000)
`,

  // ↺ · Quadrant 2
  `
U 2 (#000000)
L 2 (#000000)
D 2 (#000000)
R 2 (#000000)
`,

  // ↺ · Quadrant 3
  `
L 2 (#000000)
D 2 (#000000)
R 2 (#000000)
U 2 (#000000)
`,

  // ↺ · Quadrant 4
  `
D 2 (#000000)
R 2 (#000000)
U 2 (#000000)
L 2 (#000000)
`,

  // Example
  `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
`,

  // Example parts
  `
R 3 (#000000)
D 2 (#000000)
L 1 (#000000)
D 2 (#000000)
R 1 (#000000)
D 2 (#000000)
L 3 (#000000)
U 6 (#000000)
`,
].slice(0,1)) {
  let coordinate = { x: 0, y: 0 };
  let area = 1;
  for (const { direction, distance } of input
    .trim()
    .split("\n")
    .map((line) => {
      const [direction, distanceString] = line.split(" ");
      return { direction, distance: Number(distanceString) };
    })) {
    switch (direction) {
      case "R":
        coordinate = { x: coordinate.x + distance, y: coordinate.y };
        area += distance;
        break;
      case "D":
        coordinate = { x: coordinate.x, y: coordinate.y - distance };
        area += (coordinate.x + 1) * distance;
        break;
      case "L":
        coordinate = { x: coordinate.x - distance, y: coordinate.y };
        area += 0;
        break;
      case "U":
        coordinate = { x: coordinate.x, y: coordinate.y + distance };
        area -= coordinate.x * distance;
        break;
    }
  }
  console.log(area);
}
