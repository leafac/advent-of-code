// https://www.desmos.com/calculator/6xm7ol24md
// https://www.desmos.com/calculator/ljrhwermvw
// https://www.desmos.com/calculator/gn4iu1gl4s
// https://www.desmos.com/3d/5b7cf02b08
// https://www.desmos.com/calculator/zacp4owukj
// https://www.desmos.com/calculator/ghaaecn7ru

let input = `___three lines of input is enough___`;

input = `
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3
`;

input = ``;

const offset = 200000000000000;

const hailstones = input
  .trim()
  .split("\n")
  .map((line) => {
    const [
      [positionX, positionY, positionZ],
      [velocityX, velocityY, velocityZ],
    ] = line
      .split("@")
      .map((section) =>
        section.split(",").map((element) => Number(element.trim()))
      );
    return {
      position: {
        x: positionX - offset,
        y: positionY - offset,
        z: positionZ - offset,
      },
      velocity: { x: velocityX, y: velocityY, z: velocityZ },
    };
  });

const [hailstoneA, hailstoneB, ...hailstonesRest] = hailstones;

const rock = {
  position: { x: undefined, y: undefined, z: undefined },
  velocity: { x: undefined, y: undefined, z: undefined },
};

velocitySearch: for (let sum = 0; sum <= Infinity; sum++)
  for (const quadrant of [
    { x: +1, y: +1 },
    { x: -1, y: +1 },
    { x: -1, y: -1 },
    { x: +1, y: -1 },
  ])
    intersectionSearch: for (let x = 0; x <= sum; x++) {
      rock.velocity.x = x * quadrant.x;
      rock.velocity.y = (sum - x) * quadrant.y;
      const referenceIntersection = intersection(hailstoneA, hailstoneB);
      if (
        Number.isNaN(referenceIntersection.x) ||
        Number.isNaN(referenceIntersection.y)
      )
        continue intersectionSearch;
      for (const hailstoneB of hailstonesRest) {
        const otherIntersection = intersection(hailstoneA, hailstoneB);
        if (
          Number.isNaN(otherIntersection.x) ||
          Number.isNaN(otherIntersection.y)
        )
          continue intersectionSearch;
        if (
          Math.abs(referenceIntersection.x - otherIntersection.x) > 0.5 ||
          Math.abs(referenceIntersection.y - otherIntersection.y) > 0.5
        )
          continue intersectionSearch;
      }
      rock.position.x = referenceIntersection.x;
      rock.position.y = referenceIntersection.y;
      break velocitySearch;
      function intersection(hailstoneA, hailstoneB) {
        // f(x) = a*x + b

        // f(px) = py
        // f(px + vx) = py + vy

        // a*px + b = py
        // a*(px + vx) + b = py + vy
        // a*(px + vx) + b = a*px + b + vy
        // a*(px + vx) - a*px = vy
        // a*vx = vy

        // a = vy / vx
        // b = py - a*px

        // fA(x) = Aa*x + Ab
        // Aa = Avy / Avx
        // Ab = Apy - Aa*Apx

        // fB(x) = Ba*x + Bb
        // Ba = Bvy / Bvx
        // Bb = Bpy - Ba*Bpx

        // fA(x) = fB(x)
        // =>
        // Aa*x + Ab = Ba*x + Bb
        // x = (Bb - Ab) / (Aa - Ba)
        // y = Aa*x + Ab

        const Apx = hailstoneA.position.x;
        const Apy = hailstoneA.position.y;
        const Avx = hailstoneA.velocity.x - rock.velocity.x;
        const Avy = hailstoneA.velocity.y - rock.velocity.y;

        const Bpx = hailstoneB.position.x;
        const Bpy = hailstoneB.position.y;
        const Bvx = hailstoneB.velocity.x - rock.velocity.x;
        const Bvy = hailstoneB.velocity.y - rock.velocity.y;

        const Aa = Avy / Avx;
        const Ab = Apy - Aa * Apx;

        const Ba = Bvy / Bvx;
        const Bb = Bpy - Ba * Bpx;

        const x = (Bb - Ab) / (Aa - Ba);
        const y = Aa * x + Ab;

        return { x, y };
      }
    }

// x = px + vx*t

// Ax = Apx + Avx*t
// Rx = Rpx + Rvx*t

// Ax = Rx
// =>
// Apx + Avx*t = Rpx + Rvx*t
// t = (Rpx - Apx) / (Avx - Rvx)

const hailstoneATime =
  (rock.position.x - hailstoneA.position.x) /
  (hailstoneA.velocity.x - rock.velocity.x);
const hailstoneBTime =
  (rock.position.x - hailstoneB.position.x) /
  (hailstoneB.velocity.x - rock.velocity.x);

// p = p0 + v*t

const hailstoneAZ =
  hailstoneA.position.z + hailstoneA.velocity.z * hailstoneATime;
const hailstoneBZ =
  hailstoneB.position.z + hailstoneB.velocity.z * hailstoneBTime;

// v = d/t

rock.velocity.z =
  (hailstoneBZ - hailstoneAZ) / (hailstoneBTime - hailstoneATime);

// p = p0 + v*t

rock.position.z = hailstoneAZ - rock.velocity.z * hailstoneATime;

console.log(rock);
console.log(
  Object.values(rock.position).reduce((a, b) => a + b, 0) + offset * 3
);
