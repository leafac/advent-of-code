let input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

let result = 0;
for (const match of input.matchAll(
  /mul\((?<left>[0-9]{1,3}),(?<right>[0-9]{1,3})\)/g
))
  result += parseInt(match.groups.left) * parseInt(match.groups.right);
console.log(result);
