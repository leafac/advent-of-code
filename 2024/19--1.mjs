let input = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`;

const [towelsString, designsString] = input.trim().split("\n\n");
const towels = towelsString.split(", ");
const designs = designsString.split("\n");
let possibleDesigns = 0;
for (const design of designs) {
  try {
    (function step(design) {
      if (design === "") {
        possibleDesigns++;
        throw "DONE";
      }
      for (const towel of towels)
        if (design.startsWith(towel)) step(design.slice(towel.length));
    })(design);
  } catch {}
}
console.log(possibleDesigns);
