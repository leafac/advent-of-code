let input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

let result = 0;
let enabled = true;
for (const match of input.matchAll(
  /mul\((?<left>[0-9]{1,3}),(?<right>[0-9]{1,3})\)|(?<do>do\(\))|(?<dont>don't\(\))/g
))
  if (typeof match.groups.do === "string") enabled = true;
  else if (typeof match.groups.dont === "string") enabled = false;
  else if (enabled)
    result += parseInt(match.groups.left) * parseInt(match.groups.right);
console.log(result);
