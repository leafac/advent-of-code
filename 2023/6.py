# David’s inputs part 1
races = [
  (45 ,295),
  (98 ,1734),
  (83 ,1278),
  (73,1210),
]

# David’s inputs part 2
races = [
  (45988373 ,295173412781210),
]

# # Leandro’s inputs part 1
# races = [
#   (59, 597),
#   (79, 1234),
#   (65, 1032),
#   (75, 1328),
# ]

# # Leandro’s inputs part 2
races = [
  (59796575, 597123410321328),
]

# # Sample input part 1
# races = [
#   # time, distance
#   (7, 9),
#   (15, 40),
#   (30, 200),
# ]

# # Sample input part 2
# races = [
#   # time, distance
#   (71530, 940200),
# ]

ways = None
for time, distance in races:
    print(f"Time: {time}, Distance: {distance}")
    count = 0
    for i in range(time + 1):
        if i * (time - i) > distance:
          count += 1
    ways = 1 if ways == None else ways
    ways *= count
assert ways != None
print(ways)