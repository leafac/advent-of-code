use std::io;

fn main() -> io::Result<()> {
    let coords: Vec<_> = io::stdin()
        .lines()
        .filter_map(|line| line.ok())
        .map(|line| {
            let splits: Vec<_> = line.split(",").collect();
            (
                splits[0].parse::<u128>().unwrap(),
                splits[1].parse::<u128>().unwrap(),
            )
        })
        .collect();
    let mut max_area = 0;
    for i in 0..coords.len() {
        for j in i + 1..coords.len() {
            let left = coords[i];
            let right = coords[j];
            let area = (right.0.abs_diff(left.0) + 1) * (right.1.abs_diff(left.1) + 1);
            if area > max_area {
                max_area = area;
            }
        }
    }
    println!("{}", max_area);
    Ok(())
}
