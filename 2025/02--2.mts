let input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

let invalidIdsSum = 0;

for (const range of input.trim().split(",")) {
  const [lower, upper] = range.split("-");
  for (let id = Number(lower); id <= Number(upper); id++) {
    const idString = String(id);
    for (let size = 1; size <= idString.length / 2; size++)
      if (
        idString.length % size === 0 &&
        idString.slice(0, size).repeat(idString.length / size) === idString
      ) {
        invalidIdsSum += id;
        break;
      }

    // for (let size = 1; size <= idString.length / 2; size++) {
    //   let rep = "";
    //   let okay = true;
    //   for (let start = 0; start < idString.length; start += size) {
    //     const x = idString.slice(start, start + size);
    //     console.log(idString, ">>> ", x);
    //     if (start === 0) {
    //       rep = x;
    //       continue;
    //     }
    //     if (rep !== x) {
    //       okay = false;
    //       break;
    //     }
    //   }
    //   if (okay) {
    //     // ... increment sum
    //     console.log("✅invalidIdsSum += id");
    //     invalidIdsSum += id;
    //     break;
    //   }
    // }
  }
}

console.log(invalidIdsSum);
