let input = `___`;

// input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

// input = `HASH`;

console.log(
  input
    .split(",")
    .reduce(
      (sum, step) =>
        (sum += step
          .split("")
          .reduce(
            (hash, character) => ((hash + character.charCodeAt()) * 17) % 256,
            0
          )),
      0
    )
);
