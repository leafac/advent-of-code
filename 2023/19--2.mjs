let input = `___`;

// input = `
// px{a<2006:qkq,m>2090:A,rfg}
// pv{a>1716:R,A}
// lnx{m>1548:A,A}
// rfg{s<537:gd,x>2440:R,A}
// qs{s>3448:A,lnx}
// qkq{x<1416:A,crn}
// crn{x>2662:A,R}
// in{s<1351:px,qqz}
// qqz{s>2770:qs,m<1801:hdj,R}
// gd{a>3333:R,R}
// hdj{m>838:A,pv}

// {x=787,m=2655,a=1222,s=2876}
// {x=1679,m=44,a=2067,s=496}
// {x=2036,m=264,a=79,s=2244}
// {x=2461,m=1339,a=466,s=291}
// {x=2127,m=1623,a=2188,s=1013}
// `;

// input = `
// in{s>1351:R,A}

// {x=787,m=2655,a=1222,s=2876}
// `;

const [workflowsString, partsString] = input.trim().split("\n\n");
const workflows = Object.fromEntries(
  workflowsString.split("\n").map((workflowString) => {
    const { name, rulesString } = workflowString.match(
      /^(?<name>[a-z]+)\{(?<rulesString>.*?)\}$/
    ).groups;
    const rules = rulesString.split(",").map((ruleString) => {
      const ruleStringMatch = ruleString.match(
        /^(?:(?<rating>[xmas])(?<operation>[<>])(?<operand>\d+):)?(?<destination>[a-z]+|A|R)$/
      ).groups;
      return {
        rating: ruleStringMatch.rating,
        operation: ruleStringMatch.operation,
        operand:
          ruleStringMatch.operand === undefined
            ? undefined
            : Number(ruleStringMatch.operand),
        destination: ruleStringMatch.destination,
      };
    });
    return [name, rules];
  })
);

const partsRanges = [];
const states = [
  {
    workflow: "in",
    partsRange: {
      x: { start: 1, end: 4001 },
      m: { start: 1, end: 4001 },
      a: { start: 1, end: 4001 },
      s: { start: 1, end: 4001 },
    },
    visitedWorkflows: new Set(),
  },
];
while (states.length > 0) {
  const state = states.pop();
  if (
    state.workflow === "R" ||
    state.visitedWorkflows.has(state.workflow) ||
    Object.values(state.partsRange).some((range) => range.end <= range.start)
  )
    continue;
  if (state.workflow === "A") {
    partsRanges.push(state.partsRange);
    continue;
  }
  const visitedWorkflows = new Set([...state.visitedWorkflows, state.workflow]);
  let partsRange = state.partsRange;
  for (const rule of workflows[state.workflow]) {
    if (rule.rating !== undefined) {
      states.push({
        workflow: rule.destination,
        partsRange:
          rule.operation === "<"
            ? {
                ...partsRange,
                [rule.rating]: {
                  start: partsRange[rule.rating].start,
                  end: rule.operand,
                },
              }
            : {
                ...partsRange,
                [rule.rating]: {
                  start: rule.operand + 1,
                  end: partsRange[rule.rating].end,
                },
              },
        visitedWorkflows,
      });
      partsRange =
        rule.operation === "<"
          ? {
              ...partsRange,
              [rule.rating]: {
                start: rule.operand,
                end: partsRange[rule.rating].end,
              },
            }
          : {
              ...partsRange,
              [rule.rating]: {
                start: partsRange[rule.rating].start,
                end: rule.operand + 1,
              },
            };
      continue;
    }
    states.push({
      workflow: rule.destination,
      partsRange,
      visitedWorkflows,
    });
  }
}

console.log(
  partsRanges.reduce(
    (sum, partsRange) =>
      sum +
      Object.values(partsRange).reduce(
        (product, range) => product * (range.end - range.start),
        1
      ),
    0
  )
);
