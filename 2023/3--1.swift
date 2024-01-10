import Foundation

let inputPath = FileManager.default.currentDirectoryPath + "/input.txt"
let inputUrl = URL(fileURLWithPath: inputPath)
let inputString = try String(contentsOf: inputUrl, encoding: .utf8)
let inputArray = inputString.components(separatedBy: "\n")

// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..

// 1. Iterate through the 2d array
// 2. Encounter a number -> Read the entire number
// 3. Check if the I should keep the number (check neighbours of each)

var board = [[Character]]()

for line in inputArray {
    var row = [Character]()
    for char in line {
        row.append(char)
    }
    board.append(row)
}

func getSymbolNeighbor(board: [[Character]], r: Int, c: Int) -> Character? {
    let neighbors = [
        (r - 1, c - 1), // top left
        (r - 1, c), // top
        (r - 1, c + 1), // top right
        (r, c - 1), // left
        (r, c + 1), // right
        (r + 1, c - 1), // bottom left
        (r + 1, c), // bottom
        (r + 1, c + 1), // bottom right
    ]
    for (r, c) in neighbors {
        if r < 0 || r >= board.count || c < 0 || c >= board[r].count {
            continue
        }
        let char = board[r][c]
        if !char.isNumber && char != "." {
            return char
        }
    }
    return nil
}

var sum = 0
for r in 0..<board.count {
    var currentNumber = ""
    var shouldKeepNumber = false
    for c in 0..<board[r].count {
        let char = board[r][c]
        if char.isNumber {
            currentNumber += String(char)
            shouldKeepNumber = shouldKeepNumber || getSymbolNeighbor(board: board, r: r, c: c) != nil
        } else {
            if shouldKeepNumber {
                sum += Int(currentNumber)!
            }
            currentNumber = ""
            shouldKeepNumber = false
        }
    }
    if shouldKeepNumber {
        sum += Int(currentNumber)!
    }
}

print(sum)

