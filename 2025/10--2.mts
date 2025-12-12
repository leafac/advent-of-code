/*
        b0  b1    b2  b3    b4   b5
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
3 = b4 + b5
5 = b1 + b5
4 = ...


(3)[0] (1,3)[0] (2)[0] (2,3)[0] (0,2)[0] (0,1)[0] {3,5,4,7}
(3)[0] (1,3)[1] (2)[0] (2,3)[0] (0,2)[0] (0,1)[0] {3,4,4,6}
(3)[1] (1,3)[0] (2)[0] (2,3)[0] (0,2)[0] (0,1)[0] {3,5,4,6}

*/

let input = `[##.....#.] (0,1,5,8) (1,6,7) (3,6,8) (1,3,6,7) (0,1,2,6,7) (1,2,3,5,7) (0,1,3,4,5,6,7) (1,2,4,5,7,8) (0,2,5,7,8) (1,2,3,5,7,8) {53,78,43,44,33,73,46,81,60}`;

type Machine = {
  buttons: Array<Array<number>>;
  current: Array<number>;
  presses: number;
};

// t53,78,43,44,33,73,46,81,60
// 20,45,...

function minPushes(start: Machine) {
  const openList: Machine[] = [start];
  const seen = new Set<string>();

  let i = 0;
  while (openList.length) {
    openList.sort((a, b) => sum(a.current) - sum(b.current));
    const state = openList.shift()!;
    const stateHash = state.current.join(",");
    if (seen.has(stateHash)) continue;
    seen.add(stateHash);
    // console.log(stateHash)
    // if (i++ > 500) throw new Error('🔴')
    if (sum(state.current) === 0) return state.presses;
    outer: for (let button of state.buttons) {
      const current = [...state.current];
      for (const i of button) {
        current[i] -= 1;
        if (current[i] < 0) continue outer;
      }
      const buttons = state.buttons.filter(
        (x) => !x.some((i) => current[i] === 0)
      );
      openList.push({ buttons, current, presses: state.presses + 1 });
    }
  }
  throw new Error("🐣");
}

function sum(arr: number[]) {
  let count = 0;
  for (const x of arr) {
    count += x;
  }
  return count;
}

const machines = input
  .trim()
  .split("\n")
  .map((line) => {
    const [_, ...buttons] = line.split(" ");
    const desiredRaw = buttons.pop()!;
    const desired = desiredRaw.slice(1, -1).split(",").map(Number);
    return {
      presses: 0,
      current: desired,
      buttons: buttons
        .map((x) => x.slice(1, -1).split(",").map(Number))
        .sort((a, b) => b.length - a.length),
    };
  });

let final = 0;
for (const machine of machines) {
  final += minPushes(machine);
  console.log(final);
}

console.log(">>>", final);
