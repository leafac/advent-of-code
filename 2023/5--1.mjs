const input = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

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
