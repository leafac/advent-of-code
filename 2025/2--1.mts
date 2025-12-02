let input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

let invalidIdsSum = 0;

for (const range of input.trim().split(",")) {
  const [lower, upper] = range.split("-");
  for (let id = Number(lower); id <= Number(upper); id++) {
    const idString = String(id);
    if (
      idString.length % 2 === 0 &&
      idString.slice(0, idString.length / 2) ===
        idString.slice(idString.length / 2)
    )
      invalidIdsSum += id;
  }
}

console.log(invalidIdsSum);
