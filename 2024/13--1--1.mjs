let input = `
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`;

const machines = input
  .trim()
  .split("\n\n")
  .map((machineString) => {
    const groups = machineString.match(
      /Button A: X\+(?<aX>[0-9]+), Y\+(?<aY>[0-9]+)\nButton B: X\+(?<bX>[0-9]+), Y\+(?<bY>[0-9]+)\nPrize: X=(?<prizeX>[0-9]+), Y=(?<prizeY>[0-9]+)/
    ).groups;
    return {
      a: { x: Number(groups.aX), y: Number(groups.aY) },
      b: { x: Number(groups.bX), y: Number(groups.bY) },
      prize: { x: Number(groups.prizeX), y: Number(groups.prizeY) },
    };
  });

let tokensTotal = 0;
for (const machine of machines) {
  let machineTokens = Infinity;
  for (let a = 0; a <= 100; a++)
    for (let b = 0; b <= 100; b++)
      if (
        a * machine.a.x + b * machine.b.x === machine.prize.x &&
        a * machine.a.y + b * machine.b.y === machine.prize.y
      )
        machineTokens = Math.min(machineTokens, a * 3 + b * 1);
  if (machineTokens < Infinity) tokensTotal += machineTokens;
}
console.log(tokensTotal);
