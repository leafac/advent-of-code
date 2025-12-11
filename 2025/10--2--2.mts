import Z3Initializer from "z3-solver";
const Z3ContextGenerator = await Z3Initializer.init();

let input = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`;

const machines = input
  .trim()
  .split("\n")
  .map((line) => {
    const segments = line.trim().split(" ");
    const buttons = segments
      .slice(1, -1)
      .map((segment) => new Set(segment.slice(1, -1).split(",").map(Number)));
    const joltages = segments.at(-1)!.slice(1, -1).split(",").map(Number);
    return { buttons, joltages };
  });

let presses = 0;
for (const [machineIndex, machine] of machines.entries()) {
  const Z3 = Z3ContextGenerator.Context(`machine${machineIndex}`);
  const buttons = machine.buttons.map((button, buttonIndex) => ({
    button,
    z3: Z3.Int.const(`button${buttonIndex}`),
  }));
  const optimizer = new Z3.Optimize();
  optimizer.add(
    ...buttons.map((button) => Z3.LE(Z3.Int.val(0), button.z3)),
    ...machine.joltages.map((joltage, joltageIndex) =>
      Z3.Eq(
        Z3.Sum(
          ...buttons.flatMap((button) =>
            button.button.has(joltageIndex) ? [button.z3] : []
          )
        ),
        Z3.Int.val(joltage)
      )
    )
  );
  optimizer.minimize(Z3.Sum(...buttons.map((button) => button.z3)));
  await optimizer.check();
  const model = optimizer.model();
  for (const button of buttons)
    presses += Number(model.get(button.z3).toString());
}
console.log(presses);
