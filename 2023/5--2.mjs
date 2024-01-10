const input = `___`;

const [seedsSection, ...mapsSections] = input.trim().split("\n\n");

let ranges = new Set(
  [
    ...seedsSection
      .split(":")[1]
      .trim()
      .matchAll(/(?<rangeStart>\d+) (?<rangeLength>\d+)/g),
  ].map(({ groups: { rangeStart, rangeLength } }) => ({
    start: Number(rangeStart),
    end: Number(rangeStart) + Number(rangeLength),
  }))
);

for (const mapSection of mapsSections) {
  const nextRanges = new Set();
  for (const mapLine of mapSection.split("\n").slice(1)) {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = mapLine
      .split(" ")
      .map((mapLineNumberString) => Number(mapLineNumberString));
    const sourceRangeEnd = sourceRangeStart + rangeLength;
    const rangesToWork = new Set();
    for (const range of ranges) {
      const left = {
        start: range.start,
        end: Math.min(range.end, sourceRangeStart),
      };
      const middle = {
        start: Math.max(sourceRangeStart, range.start),
        end: Math.min(sourceRangeEnd, range.end),
      };
      const right = {
        start: Math.max(sourceRangeEnd, range.start),
        end: range.end,
      };
      if (left.start < left.end) rangesToWork.add(left);
      if (middle.start < middle.end) {
        const offset = destinationRangeStart - sourceRangeStart;
        nextRanges.add({
          start: middle.start + offset,
          end: middle.end + offset,
        });
      }
      if (right.start < right.end) rangesToWork.add(right);
    }
    ranges = rangesToWork;
  }
  ranges = new Set([...nextRanges, ...ranges]);
}

console.log(Math.min(...[...ranges].map((range) => range.start)));
