/*
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}

[
{availableButtons: [(3) (2,3) (0,2) (0,1)], pressedButtons: [(1,3),(2)], indicatorLights: [...#]}
{availableButtons: [(3) (1,3) (2) (2,3) (0,1)], pressedButtons: [(1,3),(0,2)], indicatorLights: [#..#]}
]

{availableButtons: [(3) (1,3) (2) (2,3)], pressedButtons: [(0,1), (0,2)], indicatorLights: [....]}

*/

let input = ``;

type Machine = {
  available: Array<Array<number>>;
  desired: string;
};

type State = Machine & { current: string; pushed: Array<Array<number>> };

function minPushes(machine: Machine) {
  let queue: State[] = [
    {
      desired: machine.desired,
      current: ".".repeat(machine.desired.length),
      available: [...machine.available],
      pushed: [],
    },
  ];
  while (queue.length) {
    const s = queue.shift()!;
    if (s.desired === s.current) {
      return s.pushed.length;
    }

    for (const option of s.available) {
      const current = option.reduce(
        (current, index) =>
          current.slice(0, index) +
          (current[index] === "#" ? "." : "#") +
          current.slice(index + 1),
        s.current
      );
      if (queue.find((x) => x.current === current)) continue;
      queue.push({
        ...s,
        available: s.available.filter((x) => x !== option),
        pushed: [...s.pushed, option],
        current,
      });
    }
  }
  throw new Error("ooops");
}

const machines = input
  .trim()
  .split("\n")
  .map((line) => {
    const [desiredRaw, ...buttons] = line.split(" ");
    buttons.pop();
    const desired = desiredRaw.slice(1, desiredRaw.length - 1);
    return {
      desired,
      available: buttons.map((x) =>
        x
          .slice(1, x.length - 1)
          .split(",")
          .map(Number)
      ),
    };
  });

let final = 0;
for (const machine of machines) {
  final += minPushes(machine);
  console.log(final);
}

console.log(final);
