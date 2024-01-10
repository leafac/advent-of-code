import os
dir_path = os.path.dirname(os.path.realpath(__file__))
import re

with open(dir_path + '/input.txt', 'r') as f:
    values = []
    word_to_int_str = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9' }
    as_int_str = lambda x: word_to_int_str[x] if x in word_to_int_str else x
    for line in f.readlines():
        # find the digits in the line
        digits = re.findall(r'(?=(\d|one|two|three|four|five|six|seven|eight|nine))', line)
        first, last = as_int_str(digits[0]), as_int_str(digits[-1])
        value = int(first + last)
        values.append(value)
    print(sum(values))

parens := "" | "(" + parens + ")" | parens + parens
