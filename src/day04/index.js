import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(","));

const part1 = (rawInput) => {
  const pairs = parseInput(rawInput).map((pair) =>
    pair.map((range) => range.split("-").map(Number)),
  );
  let count = 0;

  pairs.forEach((pair) => {
    const [min, max] = pair[0];
    const [min2, max2] = pair[1];

    if ((min <= min2 && max >= max2) || (min2 <= min && max2 >= max)) {
      count++;
    }
  });

  return count;
};

const part2 = (rawInput) => {
  const pairs = parseInput(rawInput).map((pair) =>
    pair.map((range) => range.split("-").map(Number)),
  );
  let count = 0;

  pairs.forEach((pair) => {
    const [min, max] = pair[0];
    const [min2, max2] = pair[1];

    if ((max >= min2 && min <= max2) || (max2 >= min && min2 <= max)) {
      count++;
    }
  });

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
