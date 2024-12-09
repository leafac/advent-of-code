let input = `2333133121414131402`;

const disk = [];
let type = "file";
let fileID = 0;
for (const inputPart of input.split("").map((inputPart) => Number(inputPart))) {
  for (
    let inputPartCounter = 0;
    inputPartCounter < inputPart;
    inputPartCounter++
  )
    disk.push(
      type === "file"
        ? fileID
        : type === "space"
        ? "."
        : (() => {
            throw new Error();
          })()
    );
  if (type === "file") {
    type = "space";
    fileID++;
  } else if (type === "space") type = "file";
  else throw new Error();
}
// console.log(disk.join("|"));
let freeIndex = 0;
let fileIndex = disk.length - 1;
while (freeIndex < disk.length && 0 <= fileIndex && freeIndex < fileIndex) {
  while (
    freeIndex < disk.length &&
    freeIndex < fileIndex &&
    disk[freeIndex] !== "."
  )
    freeIndex++;
  while (0 <= fileIndex && freeIndex < fileIndex && disk[fileIndex] === ".")
    fileIndex--;
  while (
    freeIndex < disk.length &&
    0 <= fileIndex &&
    freeIndex < fileIndex &&
    disk[freeIndex] === "." &&
    disk[fileIndex] !== "."
  ) {
    [disk[freeIndex], disk[fileIndex]] = [disk[fileIndex], disk[freeIndex]];
    freeIndex++;
    fileIndex--;
  }
}
// console.log(disk.join("|"));
let checksum = 0;
for (
  let diskIndex = 0;
  diskIndex < disk.length && disk[diskIndex] !== ".";
  diskIndex++
)
  checksum += diskIndex * disk[diskIndex];
console.log(checksum);
