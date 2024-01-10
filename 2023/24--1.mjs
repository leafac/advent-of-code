let input = `___`;

// input = `
// 19, 13, 30 @ -2,  1, -2
// 18, 19, 22 @ -1, -1, -2
// 20, 25, 34 @ -2, -2, -4
// 12, 31, 28 @ -1, -2, -1
// 20, 19, 15 @  1, -5, -3
// `;

let testArea = { from: 200000000000000, to: 400000000000000 };
// testArea = { from: 7, to: 27 };

const hailstones = input
  .trim()
  .split("\n")
  .map((line) => {
    const [position, velocity] = line.split("@");
    const [positionX, positionY, positionZ] = position
      .split(",")
      .map((number) => Number(number.trim()));
    const [velocityX, velocityY, velocityZ] = velocity
      .split(",")
      .map((number) => Number(number.trim()));
    const m = velocityY / velocityX;
    const c = positionY - m * positionX;
    return {
      position: { x: positionX, y: positionY, z: positionZ },
      velocity: { x: velocityX, y: velocityY, z: velocityZ },
      m,
      c,
    };
  });

let intersections = 0;
for (
  let hailstoneAIndex = 0;
  hailstoneAIndex < hailstones.length;
  hailstoneAIndex++
) {
  const hailstoneA = hailstones[hailstoneAIndex];
  for (
    let hailstoneBIndex = hailstoneAIndex + 1;
    hailstoneBIndex < hailstones.length;
    hailstoneBIndex++
  ) {
    const hailstoneB = hailstones[hailstoneBIndex];
    if (hailstoneA.m === hailstoneB.m) continue;
    const intersectionX =
      (hailstoneB.c - hailstoneA.c) / (hailstoneA.m - hailstoneB.m);
    const intersectionY = hailstoneA.m * intersectionX + hailstoneA.c;
    if (
      ((0 < hailstoneA.velocity.x && hailstoneA.position.x <= intersectionX) ||
        (hailstoneA.velocity.x < 0 &&
          intersectionX <= hailstoneA.position.x)) &&
      ((0 < hailstoneB.velocity.x && hailstoneB.position.x <= intersectionX) ||
        (hailstoneB.velocity.x < 0 &&
          intersectionX <= hailstoneB.position.x)) &&
      testArea.from <= intersectionX &&
      intersectionX <= testArea.to &&
      testArea.from <= intersectionY &&
      intersectionY <= testArea.to
    )
      intersections++;
  }
}
console.log(intersections);
