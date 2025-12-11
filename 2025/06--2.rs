use std::io;

fn main() -> io::Result<()> {
    let input: Vec<_> = io::stdin().lines().map(|l| l.unwrap()).collect();
    let numbers: Vec<_> = input.iter().take(input.len() - 1).collect();
    let operators = input.last().unwrap();

    let mut grand_total = 0u128;
    let mut operands: Vec<u64> = vec![];
    for (column, next_char) in operators.char_indices().rev() {
        let number: String = numbers
            .iter()
            .filter_map(|line| line.chars().nth(column))
            .filter(|c| !c.is_whitespace())
            .collect();
        if !number.is_empty() {
            operands.push(number.parse().unwrap());
        }

        if !next_char.is_whitespace() {
            let mut current_total;
            if next_char == '*' {
                current_total = 1u64;
                for operand in operands.iter() {
                    current_total *= operand;
                }
                grand_total += current_total as u128;
            } else {
                current_total = 0u64;
                for operand in operands.iter() {
                    current_total += operand;
                }
                grand_total += current_total as u128;
            }

            operands.clear();
        }
    }

    println!("{grand_total}");

    Ok(())
}
