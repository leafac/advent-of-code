const input = `___`;

const labelToRelativeStrengths = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

console.log(
  input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [hand, bidString] = line.split(" ");
      const handArray = hand.split("");
      const labelCounts = {};
      for (const label of handArray) {
        labelCounts[label] ??= 0;
        labelCounts[label]++;
      }
      const counts = Object.values(labelCounts).sort((a, b) => b - a);
      const type =
        counts[0] === 5
          ? 6
          : counts[0] === 4
          ? 5
          : counts[0] === 3 && counts[1] === 2
          ? 4
          : counts[0] === 3 && counts[1] === 1 && counts[2] === 1
          ? 3
          : counts[0] === 2 && counts[1] === 2
          ? 2
          : counts[0] === 2
          ? 1
          : 0;
      return { hand, bid: Number(bidString), handArray, type };
    })
    .sort(
      (handA, handB) =>
        handA.type -
        handB.type +
        0.01 *
          (labelToRelativeStrengths.indexOf(handA.hand[0]) -
            labelToRelativeStrengths.indexOf(handB.hand[0])) +
        0.0001 *
          (labelToRelativeStrengths.indexOf(handA.hand[1]) -
            labelToRelativeStrengths.indexOf(handB.hand[1])) +
        0.000001 *
          (labelToRelativeStrengths.indexOf(handA.hand[2]) -
            labelToRelativeStrengths.indexOf(handB.hand[2])) +
        0.00000001 *
          (labelToRelativeStrengths.indexOf(handA.hand[3]) -
            labelToRelativeStrengths.indexOf(handB.hand[3])) +
        0.0000000001 *
          (labelToRelativeStrengths.indexOf(handA.hand[4]) -
            labelToRelativeStrengths.indexOf(handB.hand[4]))
    )
    .reduce(
      (totalWinnings, hand, almostRank) =>
        totalWinnings + hand.bid * (almostRank + 1),
      0
    )
);
