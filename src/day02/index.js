import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.split(" "));

const score = (u, opp) => {
  if (u === "X") { // rock
    if (opp === "A") { // rock
      return 3 + 1;
    }
    if (opp === "B") { // paper
      return 0 + 1;
    }
    if (opp === "C") { // scissors
      return 6 + 1;
    }
  }
  if (u === "Y") { // paper
    if (opp === "A") { // rock
      return 6 + 2;
    }
    if (opp === "B") { // paper
      return 3 + 2;
    }
    if (opp === "C") { // scissors
      return 0 + 2;
    }
  }
  if (u === "Z") { // scissors
    if (opp === "A") { // rock
      return 0 + 3;
    }
    if (opp === "B") { // paper
      return 6 + 3;
    }
    if (opp === "C") { // scissors
      return 3 + 3;
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const scores = input.map((line) => {
    const [opp, u] = line;
    return score(u, opp);
  });

  return scores.reduce((a, b) => a + b, 0);
};

const outcome = (opp, out) => {
  if (opp === "A") { // rock
    if (out === "X") { // lose
      // sciscors
      return 0 + 3;
    }
    if (out === "Y") { // draw
      // rock
      return 3 + 1;
    }
    if (out === "Z") { // win
      // paper
      return 6 + 2;
    }
  }
  if (opp === "B") { // paper
    if (out === "X") { // lose
      // rock
      return 0 + 1;
    }
    if (out === "Y") { // draw
      // paper
      return 3 + 2;
    }
    if (out === "Z") { // win
      // scissors
      return 6 + 3;
    }
  }
  if (opp === "C") { // scissors
    if (out === "X") { // lose
      // paper
      return 0 + 2;
    }
    if (out === "Y") { // draw
      // scissors
      return 3 + 3;
    }
    if (out === "Z") { // win
      // rock
      return 6 + 1;
    }
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const outcomes = input.map((line) => {
    const [opp, out] = line;
    return outcome(opp, out);
  });

  return outcomes.reduce((a, b) => a + b, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
