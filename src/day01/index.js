import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => parseInt(line, 10));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let count = 0;
  let max = 0;
  input.forEach((i) => {
    if (isNaN(i)) {
      if (count > max) {
        max = count;
      }
      count = 0;
    } else {
      count += i;
    }
  });

  return max;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let count = 0;
  const elfs = [];
  input.forEach((i) => {
    if (isNaN(i)) {
      elfs.push(count);
      count = 0;
    } else {
      count += i;
    }
  });

  if (count > 0) {
    elfs.push(count);
  }

  const sorted = elfs.sort((a, b) => b - a);

  const res = sorted.slice(0, 3).reduce((a, b) => a + b, 0);

  return res;
};

run({
  part1: {
    tests: [
      {
        input: `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
