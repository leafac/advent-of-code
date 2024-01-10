var testInput = @"___";

var games = testInput.Split(Environment.NewLine);

// 12 red cubes, 13 green cubes, and 14 blue cubes
var maxReds = 12;
var maxGreens = 13;
var maxBlues = 14;
var sum = 0;
var powersetSum = 0L;
foreach(var game in games)
{
    var parts = game.Split(':');
    
    var gameNumber = int.Parse(parts[0].Split(' ')[1]);
    var draws = parts[1].Split(';');
    var ok = true;
    var reds = 0;
    var greens = 0;
    var blues = 0;
    foreach(var draw in draws)
    {
        var cubes = draw.Split(',');

        foreach(var cube in cubes)
        {
            var x = cube.Trim().Split(' ');
            var color = x[1];
            var count = int.Parse(x[0]);
            if (color == "red") reds = Math.Max(reds, count);
            if (color == "green") greens = Math.Max(greens, count);
            if (color == "blue") blues = Math.Max(blues, count);

            if ((color == "red" && count > maxReds) ||
                (color == "green" && count > maxGreens) ||
                (color == "blue" && count > maxBlues))
                {
                    ok = false;
                }
        }
    }
    if (ok) {
        sum += gameNumber;
    }
    powersetSum += reds * greens * blues;
    Console.WriteLine($"Game {gameNumber}");
    
}
Console.WriteLine($"Sum {sum}");
Console.WriteLine($"PowersetSum {powersetSum}");
