let input = `___`;

// input = `
// 1,0,1~1,2,1
// 0,0,2~2,0,2
// 0,2,3~2,2,3
// 0,0,4~0,2,4
// 2,0,5~2,2,5
// 0,1,6~2,1,6
// 1,1,8~1,1,9
// `;

const bricks = new Map(
  input
    .trim()
    .split("\n")
    .map((line) => {
      const [from, to] = line.split("~");
      const [fromX, fromY, fromZ] = from.split(",");
      const [toX, toY, toZ] = to.split(",");
      return [
        line,
        {
          from: { x: Number(fromX), y: Number(fromY), z: Number(fromZ) },
          to: { x: Number(toX), y: Number(toY), z: Number(toZ) },
        },
      ];
    })
    .sort((entryA, entryB) => entryA[1].from.z - entryB[1].from.z)
);
function settle(bricks) {
  const topView = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => 0)
  );
  for (const [brickKey, brick] of bricks) {
    let maxZ = 0;
    for (let x = brick.from.x; x <= brick.to.x; x++)
      for (let y = brick.from.y; y <= brick.to.y; y++)
        maxZ = Math.max(maxZ, topView[y][x]);
    const fromZ = maxZ + 1;
    const toZ = fromZ + brick.to.z - brick.from.z;
    bricks.set(brickKey, {
      from: { ...brick.from, z: fromZ },
      to: { ...brick.to, z: toZ },
    });
    for (let x = brick.from.x; x <= brick.to.x; x++)
      for (let y = brick.from.y; y <= brick.to.y; y++) topView[y][x] = toZ;
  }
  return bricks;
}
const bricksSettlement = settle(bricks);
console.log(
  [...bricks.keys()].reduce(
    (sum, brickKey) =>
      sum +
      [
        ...settle(
          new Map(
            [...bricks.entries()].filter(
              ([anotherBrickKey, brick]) => brickKey !== anotherBrickKey
            )
          )
        ).entries(),
      ].reduce(
        (sum, [brickKey, brick]) =>
          sum +
          (bricksSettlement.get(brickKey).from.z !== brick.from.z ? 1 : 0),
        0
      ),
    0
  )
);
