from dataclasses import dataclass


# Part 1 example
input = r"""
.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....
"""

print(input)


board = []
for line in input.splitlines():
    if line:
        board.append(list(line))


def board_str(board):
    return '\n'.join(''.join(row) for row in board)


@dataclass
class Cell:
    r: int
    c: int

    def __hash__(self):
        return hash((self.r, self.c))


@dataclass
class Node:
    cell: Cell
    direction: str

    def __hash__(self):
        return hash(self.cell)


def in_bounds(r, c):
    return 0 <= r < len(board) and 0 <= c < len(board[0])


start_cell = Cell(0, 0)
start_direction = 'right'
start_node = Node(start_cell, start_direction)
open_list = [start_node]
energized = set()
seen = set()
while open_list:
    node = open_list.pop(0)
    if node in seen:
        continue
    r = node.cell.r
    c = node.cell.c
    seen.add(node)
    if not in_bounds(r, c):
        continue
    energized.add(node.cell)
    cell = node.cell

    up = Node(Cell(r - 1, c), 'up')
    right = Node(Cell(r, c + 1), 'right')
    down = Node(Cell(r + 1, c), 'down')
    left = Node(Cell(r, c - 1), 'left')

    char = board[r][c]
    if char == '.':
        if node.direction == 'right':
            open_list.append(right)
        elif node.direction == 'down':
            open_list.append(down)
        elif node.direction == 'left':
            open_list.append(left)
        elif node.direction == 'up':
            open_list.append(up)
    elif char == '|':
        if node.direction == 'right' or node.direction == 'left':
            open_list.append(up)
            open_list.append(down)
        elif node.direction == 'up':
            open_list.append(up)
        elif node.direction == 'down':
            open_list.append(down)
    elif char == '-':
        if node.direction == 'up' or node.direction == 'down':
            open_list.append(left)
            open_list.append(right)
        elif node.direction == 'left':
            open_list.append(left)
        elif node.direction == 'right':
            open_list.append(right)
    elif char == '/':
        if node.direction == 'up':
            open_list.append(right)
        elif node.direction == 'right':
            open_list.append(up)
        elif node.direction == 'down':
            open_list.append(left)
        elif node.direction == 'left':
            open_list.append(down)
    elif char == '\\':
        if node.direction == 'up':
            open_list.append(left)
        elif node.direction == 'left':
            open_list.append(up)
        elif node.direction == 'down':
            open_list.append(right)
        elif node.direction == 'right':
            open_list.append(down)

print('energized', len(energized))
