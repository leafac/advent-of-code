input = [[___]]

score = 0

cards_counts = {}

card_number = 1
for line in input:gmatch("[^\n]+") do
    if cards_counts[card_number] == nil then cards_counts[card_number] = 1 end
    winning_numbers_string, our_numbers_string = line:match(": (.*) | (.*)")

    -- Split winning numbers on spaces
    winning_numbers = {}
    for number in winning_numbers_string:gmatch("%d+") do
        winning_numbers[tonumber(number)] = true
    end

    -- Split our numbers on spaces
    our_winning_numbers_count = 0
    for number in our_numbers_string:gmatch("%d+") do
        if winning_numbers[tonumber(number)] then
            our_winning_numbers_count = our_winning_numbers_count + 1
        end
    end
    if our_winning_numbers_count >= 1 then
        score = score + 2 ^ (our_winning_numbers_count - 1)
        for j = card_number + 1, card_number + our_winning_numbers_count do
            if cards_counts[j] == nil then cards_counts[j] = 1 end
            cards_counts[j] = cards_counts[j] + cards_counts[card_number]
        end
    end
    card_number = card_number + 1
end

score_part_2 = 0
for j = 1, #cards_counts do score_part_2 = score_part_2 + cards_counts[j] end

print(score)
print(score_part_2)
