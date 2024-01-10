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

const parts = partsString
  .split("\n")
  .map((partString) =>
    Object.fromEntries(
      Object.entries(
        partString.match(
          /^\{x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)\}$/
        ).groups
      ).map(([key, value]) => [key, Number(value)])
    )
  );

console.log(
  parts
    .filter((part) => {
      let workflow = "in";
      outer: while (true) {
        for (const rule of workflows[workflow])
          if (
            rule.rating === undefined ||
            (rule.operation === ">" && part[rule.rating] > rule.operand) ||
            (rule.operation === "<" && part[rule.rating] < rule.operand)
          ) {
            if (rule.destination === "A") return true;
            else if (rule.destination === "R") return false;
            workflow = rule.destination;
            continue outer;
          }
        throw new Error("no matching rule");
      }
    })
    .reduce((sum, part) => sum + Object.values(part).reduce((a, b) => a + b), 0)
);
