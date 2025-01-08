let input = ``;

const orbits = new Map<string, Set<string>>();
for (const line of input.trim().split("\n")) {
  const [object1, object2] = line.split(")");
  orbits.get(object1)?.add(object2) ?? orbits.set(object1, new Set([object2]));
  orbits.get(object2)?.add(object1) ?? orbits.set(object2, new Set([object1]));
}

const visited = new Set<string>();
(function traverse(object1, depth) {
  if (visited.has(object1)) return;
  visited.add(object1);
  if (object1 === "SAN") {
    console.log(depth);
    return;
  }
  for (const object2 of orbits.get(object1) ?? new Set()) {
    traverse(object2, depth + 1);
  }
})("YOU", -2);
