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
leftList.sort();
rightList.sort();
let distancesSum = 0;
for (let listIndex = 0; listIndex < leftList.length; listIndex++)
  distancesSum += Math.abs(leftList[listIndex] - rightList[listIndex]);
console.log(distancesSum);
