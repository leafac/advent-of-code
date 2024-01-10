from dataclasses import dataclass
from typing import List
import itertools

input = """
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
"""


def checksum(configuration):
    state = "."
    sequences = []
    sequence = None
    for character in configuration:
        if state == "." and character == "#":
            sequence = 1
        elif state == "#" and character == "#":
            sequence += 1
        elif state == "#" and character == ".":
            sequences.append(sequence)
            sequence = None
        state = character
    if sequence != None:
        sequences.append(sequence)
        sequence = None
    return sequences

# chars: List[str], expected: List[int]


@dataclass
class Line:
    chars: List[str]
    expected: List[int]


lines = []
for line in input.splitlines():
    if line == "":
        continue
    chars, expected = line.split(" ")
    expected = [int(x) for x in expected.split(",")]
    line = Line(list(chars), expected)
    lines.append(line)

# 1. Parse each line
# 2. Do every possible value for each ? -> check if it satisfies the requirements

# (repairs_to_insert) = repairs_expected - repairs_existing
# perumtations([#,#,.,.,.,.]) => fill the ?


def variants(line: Line):
    repairs_expected = sum(line.expected)
    repairs_existing = sum([1 for char in line.chars if char == "#"])
    repairs_to_insert = repairs_expected - repairs_existing
    num_question_marks = sum([1 for x in line.chars if x == "?"])
    indexes_of_question_marks = [
        i for i, x in enumerate(line.chars) if x == "?"]

    for x in itertools.combinations(range(num_question_marks), repairs_to_insert):
        l = ["."] * num_question_marks
        for index in x:
            l[index] = "#"

        copy = list(line.chars)
        i = 0
        for index in indexes_of_question_marks:
            copy[index] = l[i]
            i += 1

        yield copy


ways = 0
for i, line in enumerate(lines):
    for variant in variants(line):
        if checksum(variant) == line.expected:
            ways += 1


print('Part 1 answer:', ways)
