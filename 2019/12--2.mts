import * as mathjs from "mathjs";

type Triple = {
  x: number;
  y: number;
  z: number;
};

const velocities: Triple[] = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 0 },
];
const positions: Triple[] = [
  { x: -1, y: 0, z: 2 },
  { x: 2, y: -10, z: -7 },
  { x: 4, y: -8, z: 8 },
  { x: 3, y: 5, z: -1 },
];

const initialPositions = JSON.parse(JSON.stringify(positions));

let stepsLCM = 1;

for (const axis of ["x", "y", "z"] as const) {
  let steps = 1;

  simulation: while (true) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const moon1 = positions[i];
        const moon2 = positions[j];
        if (moon1[axis] < moon2[axis]) {
          velocities[i] = {
            ...velocities[i],
            [axis]: velocities[i][axis] + 1,
          };
          velocities[j] = {
            ...velocities[j],
            [axis]: velocities[j][axis] - 1,
          };
        } else if (moon1[axis] > moon2[axis]) {
          velocities[i] = {
            ...velocities[i],
            [axis]: velocities[i][axis] - 1,
          };
          velocities[j] = {
            ...velocities[j],
            [axis]: velocities[j][axis] + 1,
          };
        }
      }
    }

    for (let i = 0; i < positions.length; i++) {
      const moon = positions[i];
      const velocity = velocities[i];
      for (const axis of ["x", "y", "z"] as const) {
        moon[axis] += velocity[axis];
      }
    }

    steps++;
    for (let i = 0; i < positions.length; i++)
      if (positions[i][axis] !== initialPositions[i][axis]) continue simulation;
    break;
  }

  stepsLCM = mathjs.lcm(stepsLCM, steps);
}

console.log(stepsLCM);
