/*
I did this one by hand.

I used the text editor to convert the input into Graphviz so I could visualize the graph, for example,

x14 AND y14 -> rds
turns into
x14 -> rds [label="AND"];
y14 -> rds [label="AND"];

Then I noticed that the computations have the following structure:

input output carry
000 = 0      0
001 = 1      0
010 = 1      0
011 = 0      1
100 = 1      0
101 = 0      1
110 = 0      1
111 = 1      1

output = [input1 XOR input2] XOR input3
carry  = (input1 AND input2) OR ([input1 XOR input2] AND input3)

Then I looked for operations that didn’t have the right shape, for example:

- All z’s, except for the last, must be the result of XOR.
- All operands of OR must be the result of AND.

And I used the graph to spot the wires to swap.
*/
