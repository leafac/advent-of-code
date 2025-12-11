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
      availableButtons: new Set(
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
      pressedButtons: 0,
      presses: 0,
    };
  });

let totalPresses = 0;
machines: for (const machine of machines) {
  const queue = [machine];
  while (true) {
    const machine = queue.shift()!;
    for (const button of machine.availableButtons) {
      const indicatorLights = machine.indicatorLights ^ button;
      const availableButtons = new Set(machine.availableButtons);
      availableButtons.delete(button);
      const pressedButtons = machine.pressedButtons + button;
      const presses = machine.presses + 1;
      if (indicatorLights === 0) {
        totalPresses += presses;
        continue machines;
      }
      if (
        (button | machine.indicatorLights) !== 0 &&
        queue.every((machine) => machine.pressedButtons !== pressedButtons)
      )
        queue.push({
          indicatorLights,
          availableButtons,
          pressedButtons,
          presses,
        });
    }
  }
}
console.log(totalPresses);
