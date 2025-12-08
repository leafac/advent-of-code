let input = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
`;

const junctionBoxes = input
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number));

const distances = [];

for (
  let junctionBoxesIndex1 = 0;
  junctionBoxesIndex1 < junctionBoxes.length;
  junctionBoxesIndex1++
)
  for (
    let junctionBoxesIndex2 = junctionBoxesIndex1 + 1;
    junctionBoxesIndex2 < junctionBoxes.length;
    junctionBoxesIndex2++
  ) {
    const junctionBox1 = junctionBoxes[junctionBoxesIndex1];
    const junctionBox2 = junctionBoxes[junctionBoxesIndex2];
    distances.push({
      junctionBox1,
      junctionBox2,
      distance: Math.sqrt(
        (junctionBox2[0] - junctionBox1[0]) ** 2 +
          (junctionBox2[1] - junctionBox1[1]) ** 2 +
          (junctionBox2[2] - junctionBox1[2]) ** 2
      ),
    });
  }

distances.sort(
  (distance1, distance2) => distance1.distance - distance2.distance
);

const circuits = new Set(
  junctionBoxes.map((junctionBox) => new Set([junctionBox]))
);

for (let distancesIndex = 0; distancesIndex < 1000; distancesIndex++) {
  const distance = distances[distancesIndex];
  const junctionBox1Circuit = [...circuits].find((circuit) =>
    circuit.has(distance.junctionBox1)
  )!;
  const junctionBox2Circuit = [...circuits].find((circuit) =>
    circuit.has(distance.junctionBox2)
  )!;
  if (junctionBox1Circuit === junctionBox2Circuit) continue;
  for (const junctionBox of junctionBox2Circuit)
    junctionBox1Circuit.add(junctionBox);
  circuits.delete(junctionBox2Circuit);
}

const circuitsBySize = [...circuits].sort(
  (circuit1, circuit2) => circuit2.size - circuit1.size
);

console.log(
  circuitsBySize[0].size * circuitsBySize[1].size * circuitsBySize[2].size
);
