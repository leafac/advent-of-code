import utilities from "node:util";

let input = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`;

const machines = input
  .trim()
  .split("\n")
  .map((line) => {
    const [indicatorLights, ...buttonWirings] = line.split(" ");
    buttonWirings.pop();
    return {
      indicatorLights: parseInt(
        indicatorLights
          .slice(1, -1)
          .replaceAll(".", "0")
          .replaceAll("#", "1")
          .split("")
          .reverse()
          .join(""),
        2
      ),
      buttons: new Set(
        buttonWirings.map((buttonWiring) =>
          buttonWiring
            .slice(1, -1)
            .split(",")
            .map(Number)
            .reduce(
              (buttonWiring, buttonWire) => buttonWiring | (1 << buttonWire),
              0
            )
        )
      ),
    };
  });

let totalPresses = 0;
machines: for (const machine of machines) {
  const queue = [{ machine, presses: 0 }];
  while (true) {
    const { machine, presses: previousPresses } = queue.shift()!;
    for (const button of machine.buttons) {
      if ((button | machine.indicatorLights) === 0) continue;
      const presses = previousPresses + 1;
      const indicatorLights = machine.indicatorLights ^ button;
      if (indicatorLights === 0) {
        totalPresses += presses;
        continue machines;
      }
      const buttons = new Set(machine.buttons);
      buttons.delete(button);
      if (
        queue.some(({ machine }) =>
          utilities.isDeepStrictEqual(machine.buttons, buttons)
        )
      )
        continue;
      queue.push({ machine: { indicatorLights, buttons }, presses });
    }
  }
}
console.log(totalPresses);
