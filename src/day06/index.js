import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput;

const checkBufferSize = (buffer, size) => {
  const newSet = new Set(buffer);
  return newSet.size === size;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const buffer = [...input.slice(0, 4)];
  let i = 4;

  while (i < input.length) {
    if (checkBufferSize(buffer, 4)) {
      return i;
    }
    buffer.shift();
    buffer.push(input[i]);
    i++;
  }

  return;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const buffer = [...input.slice(0, 14)];
  let i = 14;

  while (i < input.length) {
    if (checkBufferSize(buffer, 14)) {
      return i;
    }
    buffer.shift();
    buffer.push(input[i]);
    i++;
  }

  return;
};

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
