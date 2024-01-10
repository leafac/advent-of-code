const input = `___`;

const [seedsSection, ...mapsSections] = input.trim().split("\n\n");

// Part 1
// let stuff = new Set(
//   seedsSection
//     .split(":")[1]
//     .trim()
//     .split(" ")
//     .map((seed) => Number(seed))
// );

// rangeStart = 79
// rangeLength = 14
let stuff = new Set(
  [
    ...seedsSection
      .split(":")[1]
      .trim()
      .matchAll(/(?<rangeStart>\d+) (?<rangeLength>\d+)/g),
  ].flatMap(({ groups: { rangeStart, rangeLength } }) =>
    Array.from(
      { length: Number(rangeLength) },
      (_, number) => number + Number(rangeStart)
    )
  )
);

for (const mapSection of mapsSections) {
  const nextStuff = new Set();
  for (const mapLine of mapSection.split("\n").slice(1)) {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = mapLine
      .split(" ")
      .map((mapLineNumberString) => Number(mapLineNumberString));
    for (const stuffItem of stuff)
      if (
        sourceRangeStart <= stuffItem &&
        stuffItem < sourceRangeStart + rangeLength
      ) {
        stuff.delete(stuffItem);
        nextStuff.add(stuffItem + (destinationRangeStart - sourceRangeStart));
      }
  }
  stuff = new Set([...nextStuff, ...stuff]);
}

console.log(Math.min(...stuff));
