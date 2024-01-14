import crypto from "node:crypto";

let input = `___`;
for (let answer = 0; ; answer++)
  if (
    crypto
      .createHash("md5")
      .update(`${input.trim()}${answer}`)
      .digest("hex")
      .startsWith("000000")
  ) {
    console.log(answer);
    break;
  }
