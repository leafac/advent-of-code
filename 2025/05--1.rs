use std::io;

fn main() -> io::Result<()> {
    let mut id_ranges = vec![];
    // read id ranges
    for line in io::stdin().lines() {
        let line = line?;
        if line.is_empty() {
            break;
        }
        let range: Vec<u64> = line
            .split("-")
            .filter_map(|part| part.parse().ok())
            .collect();
        id_ranges.push(range[0]..=range[1]);
    }
    // read product ids
    let mut num_valid_ids = 0;
    for line in io::stdin().lines() {
        let line = line?;
        let number: u64 = line.parse().unwrap();
        for id_range in id_ranges.iter() {
            if id_range.contains(&number) {
                num_valid_ids += 1;
                break;
            }
        }
    }
    dbg!(num_valid_ids);
    Ok(())
}
