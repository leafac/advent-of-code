// start at the end
// replace the things - simplify
// in terms of ORE


// Left & right
// start at the end
// replace the things - simplify
// in terms of ORE


// Left & right

/*

function simplify(node):
    if node.chemical == ORE: 
        state["ORE"] += node.count
        return

    node.count -= minmax(state[node.chemical].count)
    if node.count == 0: return

    formula = get(node.chemical)
    for child in formula.children:
        simplify(child)

    assert formula.count > node.count
    state[node.chemical] += formula.count - node.count

    return state["ORE"]


Node
    

Math.ceil(definition.count / node.count) * node.count

10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL

{FUEL, 1}
    rec(7A)
        {A, 7}
        




10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
10 ORE, 10 ORE, 1 D  => 1 FUEL


10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
28 A, 1 B => 1 FUEL


*/