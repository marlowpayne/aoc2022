import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput.split("\n\n");

const compareLeftRight = (left, right) => {
  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    let leftItem = left[i];
    let rightItem = right[i];

    if (typeof rightItem === "undefined" && typeof leftItem !== "undefined") {
      return 1;
    }
    if (typeof leftItem === "undefined" && typeof rightItem !== "undefined") {
      return -1;
    }

    if (typeof leftItem === "number" && typeof rightItem === "number") {
      if (leftItem === rightItem) {
        continue;
      }
      if (leftItem < rightItem) {
        return -1;
      }
      if (leftItem > rightItem) {
        return 1;
      }
    }

    let nextCompare;
    if (typeof leftItem === "number" && Array.isArray(rightItem)) {
      nextCompare = compareLeftRight([leftItem], rightItem);
    } else if (Array.isArray(leftItem) && typeof rightItem === "number") {
      nextCompare = compareLeftRight(leftItem, [rightItem]);
    } else {
      nextCompare = compareLeftRight(leftItem, rightItem);
    }
    if (nextCompare !== 0) {
      return nextCompare;
    }
  }
  if (left.length === right.length) {
    return 0;
  }
  if (left.length < right.length) {
    return -1;
  }
  return 1;
};

const part1 = (rawInput) => {
  const packetPairs = parseInput(rawInput);

  let sum = 0;
  packetPairs.forEach((pair, idx) => {
    const [left, right] = pair.split("\n");
    if (compareLeftRight(JSON.parse(left), JSON.parse(right)) === -1) {
      sum += idx + 1;
    }
  });

  return sum;
};

const part2 = (rawInput) => {
  const packetPairs = parseInput(rawInput);

  const packets = packetPairs.map((pair) => pair.split("\n").map(JSON.parse));

  const divider1 = [[2]];
  const divider2 = [[6]];

  const injectAndSort = [...packets.flat(), divider1, divider2].sort(
    compareLeftRight,
  );

  let decoderKey = 1;

  injectAndSort.forEach((packet, idx) => {
    if (packet === divider1 || packet === divider2) {
      decoderKey *= idx + 1;
    }
  });

  return decoderKey;
};

run({
  part1: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
