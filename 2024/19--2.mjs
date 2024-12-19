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
const cache = new Map();
for (const design of designs) {
  possibleDesigns += (function step(design) {
    const cached = cache.get(design);
    if (cached !== undefined) return cached;
    if (design === "") return 1;
    let possibleDesigns = 0;
    for (const towel of towels)
      if (design.startsWith(towel))
        possibleDesigns += step(design.slice(towel.length));
    cache.set(design, possibleDesigns);
    return possibleDesigns;
  })(design);
}
console.log(possibleDesigns);
