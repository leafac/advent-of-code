const input = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

const leftList = [];
const rightList = [];

for (const line of input.trim().split("\n")) {
  const [leftLocationID, rightLocationID] = line
    .trim()
    .split(/\s+/)
    .map((locationIDString) => parseInt(locationIDString));
  leftList.push(leftLocationID);
  rightList.push(rightLocationID);
}
let similarityScore = 0;
for (let leftListIndex = 0; leftListIndex < leftList.length; leftListIndex++) {
  let appearances = 0;
  for (
    let rightListIndex = 0;
    rightListIndex < rightList.length;
    rightListIndex++
  )
    if (leftList[leftListIndex] === rightList[rightListIndex]) appearances++;
  similarityScore += leftList[leftListIndex] * appearances;
}
console.log(similarityScore);
