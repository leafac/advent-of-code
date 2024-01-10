from dataclasses import dataclass
from typing import List
import itertools

# input = """
# ????.#...#... 4,1,1
# ???.### 1,1,3
# .??..??...?##. 1,1,3
# ?#?#?#?#?#?#?#? 1,3,1,6
# ????.######..#####. 1,6,5
# ?###???????? 3,2,1
# """


# def checksum(configuration):
#     state = "."
#     sequences = []
#     sequence = None
#     for character in configuration:
#         if state == "." and character == "#":
#             sequence = 1
#         elif state == "#" and character == "#":
#             sequence += 1
#         elif state == "#" and character == ".":
#             sequences.append(sequence)
#             sequence = None
#         state = character
#     if sequence != None:
#         sequences.append(sequence)
#         sequence = None
#     return sequences

# input = """
# ?###???????? 3,2,1
# """

ways = 0
for i, line in enumerate(input.splitlines()):
    print(i)
    if line == "":
        continue
    chars_str, expected = line.split(" ")
    # TODO: Change 1 into 5
    expected = [int(x) for x in expected.split(",")] * 5
    chars = list('?'.join([chars_str] * 5))

    def traverse(chars, expected, previous_char):
        global ways
        if len(chars) == 0:
            if len(expected) == 0 or (len(expected) == 1 and expected[0] == 0):
                ways += 1
            return
        char, *chars = chars
        if char == "?":
            traverse([".", *chars], expected, previous_char)
            if sum(expected) > sum([1 for char in chars if char == "#"]):
                traverse(["#", *chars], expected, previous_char)
            return
        if previous_char == "." and char == ".":
            return traverse(chars, expected, char)
        if char == "#":
            if len(expected) > 0 and expected[0] > 0:
                return traverse(chars, [expected[0] - 1, *expected[1:]], char)
            return
        if previous_char == "#" and char == ".":
            if len(expected) > 0 and expected[0] == 0:
                return traverse(chars, expected[1:], char)
            return

    traverse(chars, expected, ".")

print(ways)
