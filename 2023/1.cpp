// clang++ -std=c++17 1.cpp -o 1 && ./1

#include <iostream>
#include <regex>
#include <string>
#include <vector>

int main() {
  std::vector<std::string> inputs = {
      "oneight"};

  int sum = 0;
  for (auto input : inputs) {
    std::regex digit_regex(
        "[0-9]|one|two|three|four|five|six|seven|eight|nine");
    std::smatch match;
    std::regex_search(input, match, digit_regex);
    auto firstDigit = match.str();
    std::string reversed_input(input.rbegin(), input.rend());
    std::regex reversed_digit_regex(
        "[0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin");
    std::regex_search(reversed_input, match, reversed_digit_regex);
    auto lastDigit = match.str();
    sum += stoi((firstDigit == "one"     ? "1"
                 : firstDigit == "two"   ? "2"
                 : firstDigit == "three" ? "3"
                 : firstDigit == "four"  ? "4"
                 : firstDigit == "five"  ? "5"
                 : firstDigit == "six"   ? "6"
                 : firstDigit == "seven" ? "7"
                 : firstDigit == "eight" ? "8"
                 : firstDigit == "nine"  ? "9"
                                         : firstDigit) +
                (lastDigit == "eno"     ? "1"
                 : lastDigit == "owt"   ? "2"
                 : lastDigit == "eerht" ? "3"
                 : lastDigit == "ruof"  ? "4"
                 : lastDigit == "evif"  ? "5"
                 : lastDigit == "xis"   ? "6"
                 : lastDigit == "neves" ? "7"
                 : lastDigit == "thgie" ? "8"
                 : lastDigit == "enin"  ? "9"
                                        : lastDigit));
  }
  std::cout << sum << "\n";
}