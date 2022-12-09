import run from "aocrunner";
import chunk from "lodash.chunk";

const parseInput = (rawInput) => rawInput.split("\n");

const alphaValue = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52
};

const part1 = (rawInput) => {
  const lines = parseInput(rawInput);
  return lines.map((line) => {
    const firstHalf = [...line].slice(0, line.length / 2);
    const secondHalf = new Set([...line].slice(line.length / 2));
    const intersection = firstHalf.filter((char) => secondHalf.has(char));

    return alphaValue[intersection[0]];
  }).reduce((acc, curr) => acc + curr, 0);
};

const part2 = (rawInput) => {
  const lines = parseInput(rawInput);
  const groups = chunk(lines, 3);

  return groups.map((group) => {
    const sets = group.map(g => new Set([...g]));
    const intersection = [...sets[0]].filter((char) => sets[1].has(char) && sets[2].has(char));

    return alphaValue[intersection[0]];
  }).reduce((acc, curr) => acc + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
