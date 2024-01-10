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

// 1. Find all the positions of stars
// 2. For each star, find surrounding numbers

var board = [[Character]]()

for line in inputArray {
    var row = [Character]()
    for char in line {
        row.append(char)
    }
    board.append(row)
}

var gearSum = 0

struct NumberAndCoordinates: Hashable {
    var number: Int
    var row: Int
    var column: Int
}

for r in 0..<board.count {
    for c in 0..<board[r].count {
        var char = board[r][c]
        if char == "*" {
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
            var setOfNumbersAndCoordinates: Set<NumberAndCoordinates> = []
            for (r, c) in neighbors {
                if r < 0 || r >= board.count || c < 0 || c >= board[r].count {
                    continue
                }
                char = board[r][c]
                if char.isNumber {
                    var numberString = ""
                    var numberC = c
                    while (numberC < board[r].count && board[r][numberC].isNumber) {
                        numberString += String(board[r][numberC])
                        numberC += 1
                    }
                    numberC = c - 1
                    while (numberC >= 0 && board[r][numberC].isNumber) {
                        numberString = String(board[r][numberC]) + numberString
                        numberC -= 1
                    }
                    setOfNumbersAndCoordinates.insert(NumberAndCoordinates(number: Int(numberString)!, row: r, column: numberC + 1))
                }
            }
            var gear = 1
            if setOfNumbersAndCoordinates.count == 2 {
                for numberAndCoordinate in setOfNumbersAndCoordinates {
                    gear *= numberAndCoordinate.number
                }
                gearSum += gear
            }
        }
    }
}

print(gearSum)