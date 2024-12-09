let input = `2333133121414131402`;

const disk = [];
disk.push({ type: "space", length: 0 });
let type = "file";
let fileID = 0;
for (const length of input.split("").map((inputPart) => Number(inputPart))) {
  if (type === "file") {
    disk.push({ type, length, fileID });
    fileID++;
    type = "space";
  } else if (type === "space") {
    disk.push({ type, length });
    type = "file";
  }
}
disk.push({ type: "space", length: 0 });
// console.log(
//   disk
//     .flatMap((diskItem) =>
//       Array.from({ length: diskItem.length }, () =>
//         diskItem.type === "file" ? String(diskItem.fileID) : "."
//       )
//     )
//     .join("|")
// );
defragmentation: for (
  let diskFileIndex = disk.length - 2;
  1 <= diskFileIndex;
  diskFileIndex -= 2
) {
  for (
    let diskSpaceIndex = 0;
    diskSpaceIndex < diskFileIndex;
    diskSpaceIndex += 2
  )
    if (disk[diskFileIndex].length <= disk[diskSpaceIndex].length) {
      disk[diskSpaceIndex].length -= disk[diskFileIndex].length;
      disk[diskFileIndex + 1].length +=
        disk[diskFileIndex - 1].length + disk[diskFileIndex].length;
      disk[diskFileIndex - 1].length = 0;
      disk.splice(diskSpaceIndex, 0, ...disk.splice(diskFileIndex - 1, 2));
      diskFileIndex += 2;
      continue defragmentation;
    }
}
// console.log(
//   disk
//     .flatMap((diskItem) =>
//       Array.from({ length: diskItem.length }, () =>
//         diskItem.type === "file" ? String(diskItem.fileID) : "."
//       )
//     )
//     .join("|")
// );
let checksum = 0;
let blockPosition = 0;
for (const diskItem of disk)
  for (
    let diskItemPosition = 0;
    diskItemPosition < diskItem.length;
    diskItemPosition++
  ) {
    if (diskItem.type === "file") checksum += blockPosition * diskItem.fileID;
    blockPosition++;
  }
console.log(checksum);
