import Z3Initializer from "z3-solver";
const { Z3 } = await Z3Initializer.init();

console.log(
  await Z3.eval_smtlib2_string(
    Z3.mk_context(Z3.mk_config()),
    `
      (declare-const button0 Int)
      (declare-const button1 Int)
      (declare-const button2 Int)
      (declare-const button3 Int)
      (declare-const button4 Int)
      (declare-const button5 Int)
      (assert (<= 0 button0))
      (assert (<= 0 button1))
      (assert (<= 0 button2))
      (assert (<= 0 button3))
      (assert (<= 0 button4))
      (assert (<= 0 button5))
      (assert (= (+ button4 button5) 3))
      (assert (= (+ button1 button5) 5))
      (assert (= (+ button2 button3 button4) 4))
      (assert (= (+ button0 button1 button3) 7))
      (minimize (+ button0 button1 button2 button3 button4 button5))
      (check-sat)
      (get-model)
      (get-objectives)
    `
  )
);
