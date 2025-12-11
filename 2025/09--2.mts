let input = ``;

const redTiles = input
  .trim()
  .split("\n")
  .map((line) => line.trim().split(",").map(Number));

let specialRedTiles;

for (
  let redTilesIndex = 0;
  redTilesIndex < redTiles.length - 1;
  redTilesIndex++
)
  if (
    10000 <
    Math.abs(redTiles[redTilesIndex][0] - redTiles[redTilesIndex + 1][0]) +
      Math.abs(redTiles[redTilesIndex][1] - redTiles[redTilesIndex + 1][1])
  ) {
    specialRedTiles = redTiles.slice(redTilesIndex + 1, redTilesIndex + 3);
    break;
  }

const [bottomSpecialRedTile, topSpecialRedTile] = specialRedTiles!;

let biggestArea = 0;

for (const redTile of redTiles) {
  if (topSpecialRedTile === redTile || bottomSpecialRedTile === redTile)
    continue;
  if (
    redTile[1] < topSpecialRedTile[1] &&
    !redTiles.some(
      (otherRedTile) =>
        redTile[0] < otherRedTile[0] &&
        redTile[1] < otherRedTile[1] &&
        otherRedTile[0] < topSpecialRedTile[0] &&
        otherRedTile[1] < topSpecialRedTile[1]
    )
  )
    biggestArea = Math.max(
      biggestArea,
      (Math.abs(redTile[0] - topSpecialRedTile[0]) + 1) *
        (Math.abs(redTile[1] - topSpecialRedTile[1]) + 1)
    );
  else if (
    bottomSpecialRedTile[1] < redTile[1] &&
    !redTiles.some(
      (otherRedTile) =>
        redTile[0] < otherRedTile[0] &&
        otherRedTile[1] < redTile[1] &&
        otherRedTile[0] < bottomSpecialRedTile[0] &&
        bottomSpecialRedTile[1] < otherRedTile[1]
    )
  )
    biggestArea = Math.max(
      biggestArea,
      (Math.abs(redTile[0] - bottomSpecialRedTile[0]) + 1) *
        (Math.abs(redTile[1] - bottomSpecialRedTile[1]) + 1)
    );
}

console.log(biggestArea);
