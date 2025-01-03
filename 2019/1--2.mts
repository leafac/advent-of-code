const input = ``






const fuels = input.split('\n').map(BigInt).map(mass => (mass / 3n) - 2n)

let sum = 0n
for (const fuel of fuels) {
  sum += fuel
}
console.log(sum)

