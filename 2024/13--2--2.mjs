import * as Z3Init from "z3-solver";

const Z3 = new (await Z3Init.init()).Context();

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
      prize: {
        x: Number(groups.prizeX) + 10000000000000,
        y: Number(groups.prizeY) + 10000000000000,
      },
    };
  });

let tokensTotal = 0;
for (const machine of machines) {
  const machineA = Z3.Int.const("machineA");
  const machineB = Z3.Int.const("machineB");
  const solution = await Z3.solve(
    machineA
      .mul(machine.a.x)
      .add(machineB.mul(machine.b.x))
      .eq(machine.prize.x),
    machineA.mul(machine.a.y).add(machineB.mul(machine.b.y)).eq(machine.prize.y)
  );
  if (solution === "unsat") continue;
  tokensTotal += Number(
    solution.eval(machineA.mul(3).add(machineB.mul(1))).toString()
  );
}
console.log(tokensTotal);

process.exit();
