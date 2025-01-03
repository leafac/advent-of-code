const input = ``




const masses = input.split('\n').map(Number);

function calculateFuel(fuel: number) {
    let sum = 0
    while (true) {
        fuel = Math.floor(fuel / 3) - 2
        if (fuel <= 0) {
            break
        }
        sum += fuel
    }
    return sum
}

let sum = 0
for (const fuel of masses) {
  sum += calculateFuel(fuel)
}
console.log(sum)
