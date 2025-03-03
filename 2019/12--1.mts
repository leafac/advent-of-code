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
const positions: Triple[] = [];

const STEPS = 1000;

for (let iter = 0; iter < STEPS; iter++) {
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const moon1 = positions[i];
      const moon2 = positions[j];
      for (const axis of ["x", "y", "z"] as const) {
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
  }

  for (let i = 0; i < positions.length; i++) {
    const moon = positions[i];
    const velocity = velocities[i];
    for (const axis of ["x", "y", "z"] as const) {
      moon[axis] += velocity[axis];
    }
  }
}

let totalEnergy = 0;
for (let i = 0; i < positions.length; i++) {
  const moon = positions[i];
  const velocity = velocities[i];
  const potentialEnergy =
    Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
  const kineticEnergy =
    Math.abs(velocity.x) + Math.abs(velocity.y) + Math.abs(velocity.z);
  totalEnergy += potentialEnergy * kineticEnergy;
}

console.log(totalEnergy);
