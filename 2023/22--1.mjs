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

const bricks = input
  .trim()
  .split("\n")
  .map((line) => {
    const [from, to] = line.split("~");
    const [fromX, fromY, fromZ] = from.split(",");
    const [toX, toY, toZ] = to.split(",");
    return {
      from: { x: Number(fromX), y: Number(fromY), z: Number(fromZ) },
      to: { x: Number(toX), y: Number(toY), z: Number(toZ) },
      supports: new Set(),
      supportedBy: new Set(),
    };
  });
const floor = {
  from: { x: 0, y: 0, z: 0 },
  to: { x: 9, y: 9, z: 9 },
  supports: new Set(),
  supportedBy: new Set(),
};
const topView = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, () => ({ z: 0, brick: floor }))
);
for (const brick of bricks.sort(
  (brickA, brickB) => brickA.from.z - brickB.from.z
)) {
  let maxZ = 0;
  for (let x = brick.from.x; x <= brick.to.x; x++)
    for (let y = brick.from.y; y <= brick.to.y; y++)
      maxZ = Math.max(maxZ, topView[y][x].z);
  const z = maxZ + brick.to.z - brick.from.z + 1;
  for (let x = brick.from.x; x <= brick.to.x; x++)
    for (let y = brick.from.y; y <= brick.to.y; y++) {
      if (topView[y][x].z === maxZ) {
        topView[y][x].brick.supports.add(brick);
        brick.supportedBy.add(topView[y][x].brick);
      }
      topView[y][x] = { z, brick };
    }
}
console.log(
  bricks.filter((brick) =>
    [...brick.supports].every((brick) => brick.supportedBy.size > 1)
  ).length
);
