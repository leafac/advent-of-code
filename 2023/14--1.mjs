input = `
.O.O.#........#..#...#..#....#...........#O.#.##.O#....#.......O......#..OO.#.#O....#O..O#...OO.#O..
.#....O#.#O#....OO....O#OO...O...O#.O.O.#.....O..O#..O..O...O#..........O#....O..#O.....OO....OO..O.
..#.#.#....##.#..#....O..O...O.#O.#......OO..#.#.#...OOO.##......#O..O.#.O.....O#....#..#..O.#OO###.
....OO...O###.OO...#...O....##..#..O......O......#.....#...O..#..#O.#.#O.#..#..#O...O.O..#OO.....O.#
.O..O....#O.OOO..O...O..OO.OOO.#.OOO...O...OO....O..#.#.O.#.#.O#.O....O#..##.O.#.O.O....#.....O.....
.O..O...O.O......O....O..#.O.#.....#....O#...O..O..#....#.#O.....#.#...O.O..OO.#OO.....#...#..O.....
.O..O.OO.O...O.#OO..#O......O#......OO#OO..#...##....O.....O...O...O..O.O..#O..O.O...O..##O..O....#.
.O.......#.OO..O.O#...#O..#..#.O.#.O#.##O#......OO..##..O.#.....##..O...#.#.#.......O..OOO.O..OO.##.
O#OOO.O.O.......##.O..O...O.#O..O.O..O#.##..O.#...#....O#..#O..##....O..##O#O........#...##..#.....O
....#.O..O#...OO..O.O.........O#......##........#....O.#OOO.##O##..O...#...........##...#O........O.
OO#.....OO..#........#..O..O.O#......##.#.#O.#.O.#.O..O..#OO#.#..#...###..OO.O.#...#..#....O...#.OOO
O..#..#O##.#.O......O..#....O....#..#.O#.#.O.....O.#O.......#...OO#.##O.##...O.O.#O.O..#O..O.#O..O..
......#OO......O.##....#...#......OOOOOOO..#..#O..OO.....O...O.#...#O..O..O#O#.....O....#.......O#O.
..O##..O.#..#........#O.OO...O....#...O........OO...O.....##......#..###.O..O##....O.#...OO....#..O.
.O.OO...#..#O#...O#..O...O...O#....#.O.....#O.O.O........#....#.....O...#...O#..#.#O.#......OO.#O#O.
#.#....O..O........O.#........#..O....O##.....#..O#.##...OO...O#..#.....#..O..#...#.O.#...O.O...#..O
#..........O#......O#...O.....O........#..##....#.O.#........#.....#.O#O....OO.O..O..#...#...#.O.#O.
O..OO....O...O.#.#...O...............#O#........OOO.#....O#.O.....OO#OO#.O#.O.O#....O....#..#...O.##
.#...#..OO.O.O...O.##..OOO...OO.#.OOO..........#....##.##...O...OOO.##O.....#....O.O.O.O...#.##...#.
.O.#.O....##OOOO..#..O.........O..O#..#.O......O....#.....#....##.O.#.O...#O.OO........#.......OO#..
.#.#O...#O.O..O#O#..O.......O..OO...O##...OOO.#....OO.O##...O...........O#..#..#O.......#....#..OO.O
....#...OO....#.OO.#.O.#..O#..#O..........O....OO.O.#.O.....##OOO.#..#....O.OO.#O.O#.#...#.#.O....##
O#......O###O..O...O...#O.#...............O......#..O.O.............#.#.O.#.OO.##..OO###....#O.O...O
.#O...O##.#O.O..OO..#O.OO.........##.O.#.#.OO....O.O..#O#.O...O.........OO#.OOO...#..O..O#..O...O...
...#O.O.OO...#.......O...O...O.##.....O.....#..#OOO....#......OO....#.O..........#O.......#.#.O#O...
..O..O..OO.....O....O##.O#.......O#....O.O..OOO#......O#.....OOO..O.O#O#O..O.O..#.O#O..O.OO.#O.O....
.#..O..#..O.O.###.O...#....OO#..O.......O..#.O#O##..O..O#O...O..O....##......O#O.....O....O..##O....
...#..O.O#.#O..#..OOO...#.#O...O#...#.#....O....#.#.#...OO#....O###O#..O..#O..O..OO.O#.OOO.OO##..#..
..O.##.O..OO#....#..#..O#O...O.#..#.O.#.#O.......OOO.O#O...#O..#....##.O.O........#....#O..O.#.O....
#OO#.O.OO#..#O..OO#.#OO.O..O..O.#.O...O#.....O#....#.O......OO.#...O..........#.O...#OO.....#.O.O..#
..OO#.O#......O......#...###.....#OO#O#OO#.O#..#...##O.O.#...#O..##O.O.......#.#O#....O....#........
...OOO......O....O...OO...#..###...OOOO.O.......O...O.......OO.O.....O..O#..##....O.#O....#.O.......
.OO..O.O..O.OO.O.O.O#O#...O#.....O...OO..O#.O.#.O.O.#.....O##.#..#.O#..#....O...........O#.O..O.....
..O....O.....#..#.O.O......O#OO...O..OO.....#O.#.#O#..O#..O.O....#......#.OO...O...#O.O#..O.O.##....
.#.O....##..O.#.O.#....O.O....OOOO.O......#O.O.OOOO...........OO.OO..O.##.#....#O....O...O.O..O..#..
#OOOOO.##......O.OO..#O.O.O#O....O.O..#OO#O..OO...O.##..O.O.#.O..OO..O..#.........O......O...#......
....O...O...O...........#..##.O.........O..O#...O.OOO...O..#.O..O##.OO.......O..#O#O.#..O..O.O.O.#..
..#O.#...O..OOOO#..#....OO..##O....O.#.#..#..O.OO###...#...O.#.#.#O.O..#.O..#........#.O.O##O.O.#..#
.....#.O.....#..#..#..#.O...OO#.#.O....OO..O...#.#.O.O#......O#....#O.O.#O#.#..##....O.#O.O...O..O#O
....#..#..#O.....#.#O..OOOOO...O....#O.....#..#.#..#....O..O#.OOOO........O.....O...O.##..##.O#.....
...#.#..OO......O.O.#..###.#.#....#..O.O....OO..OO.......#..O...O#..#....O...O....O..#..#..O.O...#O.
...###.....#.O..##...O.#..#.O#.O#.O......O..##.....##O.O..O..O.#.##O#.##...OO....#O.O.....O.#.#OOOO.
.#..OOO....##...O#O..O....#.......#..#.#.O....#O#.#...O....O.#..O#....#.#......#O.O......OO#.OO..#.O
..O.#OO#........#.#OO.##O.....O#O......OO#....OO..OO.O...#.....#..O.OO...#.#..O..#..O..#O.#.........
O.#OOO.O.#.O.O.#..#O..O...O....OOO..OO.OOO..#OOO.#O#.....O#....#..O...#.O...O.O.....#.O..O##O.O#O#.O
.....O..O.#.OOO..O..#O.OO..#..#.#O...#............O..O..#.#.....O.#....#.........OO......O.#.O..#.##
.O..O.O#.O....OO...O..#O.O..........#OO#..O.O...##..OO......O#O.......O.#.#....#OO.....O......O...O.
..OOOO.O#..#...O..#.O............#....#..O.#..O.#......##..#..O......##..O.O#OO#....O.OO...#.#.#...#
.#O....#..O.#....#OO...##..#..O...O.......O....O.#....#...###.O#.....O.......O.#..O####...#.OO##O.#.
.O..O.#..O......#.O..O......O....#O....O.#....O#OOO#....O..O.....##O....#..OO..O...O#.......O..O#.O.
#...#....O.....#OO..#.#..O.O.##O#..#O.......#..OOO........#.#O.....#..O.O#O....O#....O.....OOO.....#
.O#O..O..O#.O..............O#...#.........#.#O....OOOO...##OO..OO.........OOO.......##.##.......O...
.....##..#O...#OO#......O.O..O.O#.O#.#..O......#...#.#O.....O......#O#........#O...O..OO..#.O....#O.
O....###..#.............O..O.O..#.O##...O.....#....O..#...O....##.#.O......#..#...O#.O#.##O.O.......
.#O.......O#OO.##.......#..#.#.....OO.#..#.#..O.....#...##.O#O..O........###....O..O.O.#....O#.#..O.
.O#.........O...O.....OOOO.....#.O..#.#O.O#.......O.#O.#..O.OO...O....#...O.......#O.#..OO.O#...O..O
..O..#..#........O.O.#O..O..#OO#.#.........#....O.O.....O..O..O..OO..OOO.O##......#.##O....#.#O.#...
.##.O....#.....O..#O#..#..O#...##.OO#..O..O..##.O......#.....O..O.#.O..#...#.O.#..#O.#....#..O#....O
....#.......#O...##O......O..#...O.O#O...OOO.#..OO.#.#.#....#..#..#O.O..#.O.O..O#......##...O#O.#...
O...O...##.O...#.O...#....O.....#.#OO.O...O#.##..#...OO.O....O..O...#.O....O#...O...OO..O..#.....O##
O.O.......O....O.OO.O....O..O..#...#.O#...O.OO.O.##.O..O........O.#.O#.O..##..OO.#.O..O#....#O....#.
#..O...O....###O...#O.#.........O.OOO.OO...O.##....OO.O...OO.O..#.#O..#.O.OO..O.#O#.#...#OO....OO...
.#..#...O...#.O.O....O..#.O......O.....#.....#.......OO.O.......#OO#.O..#.O..O..O......#OO...#O#....
.O.....OOO#..#.O.O..##.#....O.#.O.#.........O......O..O#......#...#.........#..O.....#.O.#...O..#...
...#O..O#..OO.O....#....#.......OO..O..OO..#.O...#..O...........O...O..O.OO..#....#.O...O......###..
...##.O...O.##.#..##.....##...##..#....O.#..##.OOO....O#..#.##OO..O............O..#O...O..O..O.#....
..O..O..O.O.OO.O.OOO...#..OOO.#..##.#..O.#..O#...O..O.O##O#.OOO...###....O#.....OO.O..........OOO#O#
O##.O..O.#....O...O......O#.......OO...#O#.O.O..##...............O.#O#.....OO.#..#..#O....###.#O#.O.
..O..#...#..OO...#O........###..O#...#..#O...O...O...##......O....O#..OOO#O.........#.#..OO....#....
...O..#.O.O...O..#O...O#..O...O#..##..##....O..#O.....#....#.#...#....#...#O.##..O.#O##.....#.......
.O..#OO.#..O...#OO....O...............O.#.##....###.#.....O..O...O..O...O...OOOO....O##..OO.O...#.OO
..#O..O..OO#..#.....O.#O.....#.#...O.#..#.....###.O....#..#.......O..#..O#.......O...#.OO.OO.OOO....
.......OO..#....O.#....#.O......#...OO##......OO...#O.#.#O#.##..#O.###....OOO...OO...O#.#O.O...#.O.#
.....#...###...#O..#.O.#OO##O.O#.....##.O......O.O..#.O...#.O.....#.#OO.O#.#O#.#.O.O#..O.O#.#.#..#.O
.O...#...##..O...#.#O...O...#..O..O....O.#...O....#O..OO..#.O##.......#O.#.OO#O.O..O.....OO.OO....O.
OO.....O.#...OO...O.O#OO#.O..#...OO......#..O..O.O....O#...O.....#..O.............O#O#.#....##.#....
#.....O#...#..#..OO.O...#...#..O.#..#.......#..O..#...#O.....O....O#O.O..O.#...#.OO##..#O#.O.#..O...
.OO.................#.#O....O...#........#.O#.#OOO.O.....#.#O.#....#.O...O.........O.O..#.......O...
..O.#....#.O.#....##O....#...O.O......#.#..O......OO.....O....##....O.##O....O.....O.##.O...........
O.....O....O#...O..#....#O...O.O......O#..##.O.O.O##....#..#.OO###..#.O#OO.O.#.O.O##.OO...O..OO..O..
#....O#...O...##O.O.O.....#.OO.O.O.#.....O#.OO.#.#..O.OO...O..#O.#..#....O.#O....#.#.#O...O..#O.O...
.O..#O#..O#................#O#.OO....O#..........O.......OOOO.....#..O..O.#....O##.O....O#...O...O..
O..O.O..#.....O...O...#....O..OO#.#.O#....O.O...#.......O.#....O....##..##O.O.O....O.#.OO.#..O...O..
....O..O...#..O#.###O...O#..#..........O##..O.#.#....OO..O..#..O......OO..#......O#.O...#..OO...#...
.#..#...#.....O..O..#...#O.O.....##......#.O.#...OO.O..........#O.O..#.#O.O...#OO.#O.O.#.....#......
..O..#..O...#......#.OOOOOO..OO..#O...O###...O.....O.#.O..O.OO#..O....#..OO.#O.#.O...#.#....#.O..O..
O...#........#..OOO...OO..#....O....#O#..#O.....#..O.#.#O..O.......#...OO.O.#....#.#O..#...........O
O.O..#.....O.O.....O.#.##O..OO..#OOO.#....O.O.###.....O.#..##..#.#.......#.........#O#...#...O....OO
...#O...O#...#.OO....#....#.OO#O#OO....O#.O#O.....#.#..O##..O.#OO.#O..O....O....O.OO.#O....O.......#
O....O.#.....O.#.#O...#O.O..##.#..O...#.#O.....#.#..O..#.....OO.#..OO#..O..OO#..#...OO.....#......#O
.......#.#.O..OO...#O....O.O#.#.....#.#..O....#.....#.O#..O#..#...O#.O.....##....#....#...O..O...#O#
.#O....O.#O......O..#..O#.....O.#.#....O.#...O.#...O.O........#O....OOO#...OOO#.OO.O#.O....#.....O..
O..O.OO..O....#O..#..#.#..OO....O#....O##O.....#......O.O.O.....O..O.......O...O..O#O...OOO..O#O....
#O.#..O##O....#.....#.#....OO.O##.O.....OO.O.....#...##.O......O#.#.##.O..O###.#..O...O...O.......#.
#.O.....O...O.#OO#.###....#O.O..O.....##...##..##.#.....O#.#.O#..O#..O.....O.......O.#O...#.O.#..#..
.#..O...O..O..OOO#...###.O#O....#O#..O.#.#O.OO..O.O.O.#...#.......#.#.O.OO...#OO..#O.....#.#..#..O.#
.O....O.......OO#.....OO..#O..OOO..#O....#O......O.O.O.O..OO..O.#..O.......O...O.O.#..O.....#O...O..
.#....##O#..#OO...O..#.O.O.O......#...#...O#.....#...O..#.O.#.O..#.O..##.O.#..#.#..#O...###O.#O.....
O..O...#...O...O...........#...OO#.##...O..OOO.##.....#..##O.....#....#......#O.#.O..#O.##.#....O.#.
O.##..#....OO.O....O#O....##.#O......O.....#.....O.....O#.#.#O.#.#..O.#..#.O#...O.OO.O...##.OO...##O
`;

// Leandro
input = `
O........O..#...O...#OO..O.##..#.O....O#..#..O..#.O....#.....O.O.O..#OO#.....O#O..#.#.#O....O...#.O.
...#....O.O...#..O....#O.....#..#O.O.....O.......#.O...O.O.#O.#..O#.#O..O##...#.OO.##...#O#.O..O###.
O.......O...OO.....O...#..O#.##......O.O.O...O..##..#.O...O...O###O.#.OO.#....#O.........O.##...O#..
.##.O.........O###...#.#......#.#...O.....OO#..#......#..OO.O.OO.O#OOO....O..............O.......O#O
#......#OO#O...O#.O..#.#O..........O.............OOO.##..#....O..OO......OO.....OO.OO...O.......###.
.O...#O#......OOO.....#OO.O.OO..O....#.#..#.O.......#O..O....OO....O..O.#.O.####.O...O..O....OOO#.OO
...#.O......#...##O.......O.#.#..##......#O.O.OO.OO.....#OO#....OOO.....O...#..OOO..O.....O.O.#..O##
##.....O##.O#.O###O#O..........#...O.O.O.#..OO....O#O.##.O......O.OO.O..#......#...#.#O..O#....#...O
.OO........#..O.#O.O..O.....O...#O..OO.#O...O.#....O.O....#O.#O..O......O....#..##.O....##O..#O.O.O.
.O.O.OO..........OOO##O....#.#.##OO#O.#...O...#.#...OO.#O.#..O.O#..O....OO.#.OO.#...####.O.##..O.O##
.....OO#.#O......#.#O#.#...##...O.O.#OO#.....O#.O#.OO.O#O..O##.O#..O.OO#.O...O.#...........O.O.#....
.........O.......OO...#..O.#...O.OO#.O...OO#...O.O#....O......O..O.O.......#.#...#.#.#...#....O.....
..O...O....OO...#..OO.O...#O..O#O#.###..O##OO.....OO.......O...#..#O.....##...OOO##.#....O...#.....O
OO..OO...##.O..#.O.OO..O..O..#....O..O#.#.....O...#...O.............O.#...#O..O..OO#.OO...##.#...OO.
..#.O..#O.......OO..#.#.#.#O..O..O#.O...OO.O.....##....#.#O.O#..O.#....O#...OO.....OO.OO....O.#..O..
.#..O...OOO.......O.....O.####OO.OO..O..#...#O....###.#OOO.O.....#...##.O..O.#OO....##....O.#.#O...#
#O#.O.O#O.O....#.O#.#.....#O......O..O........#O.O.#O..O.#O........O.#.#O.O....O.#O##.......O.O...##
...O#O.##.O##.....#.....O...O..OO..#.....O..OO.O...#.OOO.O...O#.O...O........#O#..O.O#O.O..O..OOO#.#
O..O.....O....O..O...OO.O..O...OO##..#.##....#O......OOO......O#.O.#.....##OO...O..#..#.....#.......
....#O#.......#..#..O.O.......#..O.....OO...............##..#....O...O...O.O.####...#.O##..O.#.#...O
...O#..O#.OO.O#OOO.....O..........##O#.##.O.O....#..OO....#....O#....#...O#........O.......O.O.#OO..
#......#.O.............#.OO.##.###...#..#.......OO.#..#...O..#.#.....#....O..#.....O....#..O.......O
.O...O.#O.OO#.#...O.....O.O...O...O....##....#.O..#.#O...OOO.O.#.O.#.O#..O.#..O#O#.##...#..O.#O.O...
O#.O...O#...O.O..O.O#.O##..#...#...O#.O.#.#......#.........#O.#.OO.O..#.#...#.OO.OO##.......O.O.###.
O..O..O..O.#..#......##.#O#....O.OO...OO.........O...O...O..O#.O#OO.....#..##...#.#O.#...##.#.#.#...
O#O....O..O..#..#.#.....#.......OO..O....O....O.OO...OOO#..O........O.....O..#....O#..O#....OO.#O.#O
...O...O.O..O..##......#...#.O##..O..OO..#.#O#..O.#OO.#..#.O....O....#OOO.O......#O...#.#..#..O..O.O
...O..O#.O.O.#O..O.#.O...OOO.#.....#....##O.....O..O......OOO.#.O..O.#..O#....OO#.....#O.O.....#.#..
....#O..##O..O.O.O...#..OO.........#.###.O..#.O.O.......#.O.O#O..#....#.#..#.......#........#.......
.O.O#...O.OO......O.OO..#........#...#O.....O#O...O.#.O.#O.#.#.O#..O#O#.#..###....O......O...#.O..#.
.O.O.....#..O#..O.O..#..#...#..O....#..#O#...O.....#....OO.....#.#......#.#OOO..O.O..O....##........
..#...#O#.O...#O.###OO.O.#O...#...O....##..#.O...#.#...O....#.O#..O..O......O#..O.#O..O......#......
O.....O..##.....OO#.O.O.O..OO.OO..O..#......O.#....O..O##.OO..OO#.O#O#..OO.O....OOO..O..OO..OOO.O#..
.#....O........OO#O..O...#..O...O.......O.#O...O.OO...O..O#....O#OO.##.O.#.....O.O..OO......#O...O#.
..O.#OO.O..##...O.#...#..O...OO.O..O..O..O#..#.OO..OO.....O...#...#....#.O...OO....##..O........O...
OOO...O#......#.#....O.O.#.#.......#.O.....#.O..OOO#O.#......##O.O..#O#.#...O.O...............OO..O#
..#O#O.........OO....O..##.O.......O#..O....O....O..........O.......OOO.O....#..#O#..##..#OO...#..OO
..#..#...O...#O...##O.OO........#..#...OO..O.O#..O....O..#.O.#..OOO...O.O.##......O#O...........#...
...O..#O......#.....O.#.#...##...###.....#.O#.#......#.#O#O..O...##O.....OO.O.....O....O#O.#OO......
.O.#...OO#.#O..O.....O...O.......#O.#O....O...O...O.O....O.O.....OOO#O...#.OO....#..O#....O....O...O
...O.#.#.O#......OOO..............#.O....#.O..O........O...O..#OOOO.....O.#....O......##..O..O.#.O.#
O#....##.#......O.......O..#..OOO..O.....#O...........O.O.....O...O.#O.O.....#..#..#.....OO#O.#...OO
O..OO.O#....#O#.O.#.....OOO.....O.O.O.O...OOO.O.....#...##..#...O#...##...O....O.O.OO..#....O.O.....
O....#....O.........#..#..O....#OO#....O..#.....#OO..#..O.#..O..#..#...#O.#O...........O...........#
.O.#..O.#..O.#.....O..O#.#OO.#OOOOOO..O.O#..OOO....O.O.O#...O...O....O...O.##.....O..O.O.OO.OO#....O
O#.O..OO..O...#.....O...O.O.O...OO.OO..O..O............#.O....O..O.........OO.#......#O...#O..O..O..
.#O.....#.OO....O.#OO.#O....OO#OO.#.OO....O#..OO#..#O....##.#..O.O..#OO..O...O#O.O#......O...#.##O.#
........#O.....O.OO....O.#O...#.O.O..........O#..O...##..#..O..OO..####O........#O#..O...O..O##....#
O...##.O....OO....O#........O..O....O#.##O..O#.#.O....#O...#....O.#...O.OO...OO..O...........#.#....
...O#O...O....#...O..#.#..#.......O.OO#OO.....O....O..#.#.....#..O#......O.O.OO#.##....O.....O......
..#.#...#O#..O.#.O.#.#.#.O#.#OO..O..#.#.#O.O...O.......#...#O..#.#.O#O#..O......OO##..OO.....#O..#..
.......O.OO....#...O.OOO##...#O..O.....#.#.#..##O.O.............#.....#..#O....#....O##....O......#O
...#.O.#...##.O.....#.#O..O#.O.#......O.O#..#.##OO.......O........#.OO.OO.#.#OO..#O....O#..#..#...OO
#O.....#......O..##.#O..#.O..#..##....#.#.O....#....O#.O.O.#....#O..##.O....O..O..OO.#.O.#O....O..#O
...OO.O.......#.##.O#....O.O..#.O.O..O..O...#..O.OOOO.O#.O.O..O#O#..#....#.....O.....#.O....#..O.#.O
#......#OOO....#......O##.....O..#....#......#.O...O#..O.O#...#O.........#..##..O.OO....O...#...#O..
#O....O...O...O..#.....O#.....O.#O...O.O..##.O...O.#...#..O.OOOOO.O#..#.OO##.O.O.##...OO..O..O#OO.#.
...#.........#..#O.#O..###.....OO.#O....#..O.....#....OO.O.####.O.O.....#O..#..#..O...O.#..#.#.O.O#O
....O.#........OO..#...............##.....#.#.#O#.......#OO.....OOO...O..O..O.OO....##..OO#.O.OO....
..O.O.O.O##...O##.#.O#...O.OOO#.O##..O..O.#O#....#...#.......O.O...OO.O.OO....O...#.........O.#...O.
..O......O.OO.O.#.....O...#.O...O#.#...O.#..O#...O.O#.O#........#.O.O#..#..#........OO#.##.#.#O....O
..#......####.....O.O.O......O#...O.O.....O.O..#......O.........#O.O...#..####..#....#.O.#..#..#..#.
.......###OOO....O#OO.O##....#...O....#.#..O.....#......#OO#O.O..O....O.#.OO.....#.#................
#....O.#OO....O..O..O.....O#...#...O#........O#.O.#.O#O#.#.O......O.#O.#.O..O.O..#.........O.....#..
.O.O.##...O..OO...O.....O.O#..##...O..O.#..##O..O#....#.......O.O.#.......#....O#O..##....OO...##O.O
..#.....#...###........O.O..#O.......#..#..OO#O##..#...O.#...#....O...O..#..##.......#....O#.O.#O..#
#.#.OO.##.OO#....##..#..O.O...O...O....O#..O#..#O#O.#.....O#..#.........O#..O##.#..O....OO#..#O..O..
O..........O..#..#..O...#.O#...#OO..##.O..OO..OO....##.O.O....O...O.O....O.....O.....#O...O...O....O
O..OO.O..O.....#.OOO#.......O....O..O......#.O.##.OO...O...O.O.O#O.#..#.#O......#OOO..OO.O...##O..#.
...#O.O.#O#..#...#.....O....#.......#...O.####..#....#..#..O##.O##...O..O.O.....#.#.#....O#.O......O
..OO....#O..O............OOO.O....#....OOO.OO....#.....O##O.O.#O.O...#.#.O.....#..O........OO.#O..O.
....OO.#.OO#O..#.OO##OO#.#..#..O..O...O...#O.O.O.....OO.#.O....O.O.O.#O#O#....O##........#..##O##...
#.#..O.#.O......O...##....O.O.O#O#...O.O.O...O...#..OO...........#.#.....#..........#O#....O.OO#O.##
#...#......#O...........#O.OOO#OO#..#..O....##......#...O#.OO...#....O..O#...#.#.#O...#..O.........#
##O..........OO.#..#..O.......#O.#..O.#.#..O...O#O..O....O.OO...O..O....O.....#....O#O.#...O##.....#
OO..O..#O.#OOO.#.......#.....#OO....O........O.#..#.O...#........OO..#..#.....#O...#....#....O....OO
.OO....O......#O#..O.OO..OO.O..#......................O...#...#.O........#..##.#..O.#O#.#.O#O..#....
..#...O.#....#.O.....O.O...#....O#......OO.......OO.##....OO......#....##OO....O.........O.OO.#..O..
..O.O...O#...##....O##O.....#..#.......##...#.....#O#....O........O..#O.O.#........O....O.O..O#...O.
.O.......#..#.O.OO...O.....OO.#..........O...O......O..O.##.#.....O.O.........OO#.......O......O..OO
..O........O.#O..#..OO...O.....O.##O....OO#.OO#.O.O.#O...##......O..O.....O..OOO#.O##....O.O...##O..
.O#....#O.##.#..O#.O..#.O.###.#....#O#O#.OOO#.#......O....#.O#......#.........###O#.O.OO....O..#O##.
.O..O.........#.O#O..#.......OOO#OOOO......#..#..#.O##.O#...##.....O...#.#...#.#..O...O#.#.....#....
O.....#O....O.#.#...OOO##..#.....OO...O#..#..O#.#..O..O...#...#.O#....#..O.....O..O.O#.#.O....O...O.
....O.....O..O...OO......OO.#.#..O...O#...#.#O.................O..O.O.....##..#.##.#O..O.#.#..#O##OO
...##.O..#....#O#.#..O..#....#O.O.#......O.O..O#OOOOOO....O.#..#..O..#..........O#....#...#O#..OO.O.
#.#......O.#O#.....O.O...O.#.OOO..#.O.....#O.#.........O#.#.OO.O.....O..##..#O.OO..O...O....O#.##O.#
.O.........#O#..O...##....#.#.#O..O..O.#..O..O#OOO..O.....##.........O#.#O.#...#O....#..O.....##.#O.
#.O......O.O..O...O.#O.#..O.#..#O###..#..O..O....OO....O.#......O..#.OO.O#.#O....OO#O#...OOO.#.....O
..O.O.#.#O#.......#..O.......#.O..OO...OO...O#..#....OOO....OOO..#.O#.O.O.....#.O........O.#........
..O.#.......O..#.#.#.#O........#O....#.#O##.....O.O#.##O.#..OO........#...O......O...O....#...#.#..#
.#...##..O.....#O#O..O.#.#.O...O.O#O....#........#....O...OO.#OO.....O#..O#O........#.....O.....O..#
....O.O..O...OO.......O..##..##.O....O.............O.O.O....O....#......O..O........OO.O.#.O....O...
O..#......O.#.O.O.#.OOO.......O.O.#.O...OO......##...O....O.O#O..O.O.....O..#..#...O.O###O...O#...##
#.#..#..##.OO#...O..#O#..O..O..O.O...#.#..OO.OO.....O.O.O#O......O.O.O......##O..O.#....#.#.O......#
.....#OO..OOO..O...O..O..O............O#.#.#O#..O#.#......#.O.....O..........#..O....O..O.....#.O#..
#..#O.O...#.O.O.........O.O..#......OO...#...#..#.##O...#.O...........O.#.#OO.##..O..O...O.#OO...#OO
..##.##..O....OO...OOO.........#.O.......#.O#..O#....OOO.#....O#.#....OO...#.....#.O...O.........#.O
OO##..O#.OO##.......O...OOO.#..O........#O.O.#.O..O..O..#.....O.O..OO...O##....O.#..OO#O....O..##...
..O..O..#.O..........O..O..OO.....#....O#...O#........##.O.#....OO.O.....O...O####...#O.#O.O....#O..
`;

input = `
OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....
`;

input = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;

// "OO.O.O..##"
// "OO.#.O..##"

// 1. Iterate column by column from the bottom up
// 2. Collect round rocks in an array and then insert them when I hit a #

board = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => line.split(""));

const width = board[0].length;
const height = board.length;

// Transpose the board
newBoard = [];
for (let c = 0; c < height; c++) {
  let row = [];
  for (let r = 0; r < width; r++) {
    row.push(board[r][c]);
  }
  newBoard.push(row.join(""));
}
board = newBoard;

// Iterate through each row split on hashes, with in the groups, count the round rocks and dots and then re-arrange
newBoard = [];
for (let r = 0; r < height; r++) {
  let row = board[r];
  let groups = row.split("#");
  console.log("groups", groups, groups.join("#"));
  const newGroups = groups.map((x) => {
    let countRoundRocks = 0;
    for (let i = 0; i < x.length; i++) {
      if (x[i] === "O") countRoundRocks++;
    }
    return "O".repeat(countRoundRocks) + ".".repeat(x.length - countRoundRocks);
  });
  const newRow = newGroups.join("#");
  newBoard.push(newRow);
}
board.forEach((row) => console.log(row));

console.log("---");

board = newBoard;

board.forEach((row) => console.log(row));

sum = 0;
for (let c = 0; c < board[0].length; c++) {
  const factor = width - c;
  let countRoundRocks = 0;
  for (let r = 0; r < board.length; r++) {
    if (board[r][c] === "O") countRoundRocks++;
  }
  sum += countRoundRocks * factor;
}

console.log("sum", sum);

// 110779
