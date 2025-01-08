let input = ``;

const orbits = new Map<string, Set<string>>();
for (const line of input.trim().split("\n")) {
  const [object1, object2] = line.split(")");
  orbits.get(object1)?.add(object2) ?? orbits.set(object1, new Set([object2]));
}

let orbitsCount = 0;
(function traverse(object1, depth) {
  for (const object2 of orbits.get(object1) ?? new Set()) {
    orbitsCount += depth;
    traverse(object2, depth + 1);
  }
})("COM", 1);
console.log(orbitsCount);
