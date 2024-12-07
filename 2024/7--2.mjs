let input = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

const calibrations = input
  .trim()
  .split("\n")
  .map((line) => {
    const [result, operands] = line.split(":");
    return {
      result: parseInt(result),
      operands: operands
        .trim()
        .split(" ")
        .map((operand) => parseInt(operand)),
    };
  });
let totalCalibrationResult = 0;
for (const calibration of calibrations)
  if (trueable(calibration)) totalCalibrationResult += calibration.result;
console.log(totalCalibrationResult);
function trueable(calibration) {
  return (
    (1 === calibration.operands.length &&
      calibration.result === calibration.operands[0]) ||
    (1 < calibration.operands.length &&
      (trueable({
        ...calibration,
        operands: [
          calibration.operands[0] + calibration.operands[1],
          ...calibration.operands.slice(2),
        ],
      }) ||
        trueable({
          ...calibration,
          operands: [
            calibration.operands[0] * calibration.operands[1],
            ...calibration.operands.slice(2),
          ],
        }) ||
        trueable({
          ...calibration,
          operands: [
            parseInt(
              String(calibration.operands[0]) + String(calibration.operands[1])
            ),
            ...calibration.operands.slice(2),
          ],
        })))
  );
}
