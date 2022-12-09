import run from "aocrunner";

const chunk = (arr, size) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % size === 0) {
      res.push([arr[i]]);
    } else {
      res[res.length - 1].push(arr[i]);
    }
  }
  return res;
};

let stacks = [[]];
let stackNum = 1;
let nums = [];
let hasLoadedStacks = false;

const extractVal = (chars) => {
  const startStackNum = stackNum;
  chars.forEach((char) => {
    if (typeof char === "string") {
      if (/^[A-Z]+$/.test(char)) {
        if (!stacks[stackNum]) {
          stacks[stackNum] = [char];
        } else {
          stacks[stackNum].push(char);
        }
        stackNum++;
      } else if (/^[0-9]+$/.test(char)) {
        nums.push(char);
      } else if (/^[a-z]+$/.test(char)) {
        hasLoadedStacks = true;
        return;
      }
    }
  });
  if (stackNum === startStackNum) {
    stackNum++;
  }
};

const padEmptyStacks = () => {
  const numStacks = Math.max(...nums);
  for (let i = 0; i < numStacks; i++) {
    if (!stacks[i]) {
      stacks[i] = [];
    }
  }
};

const processMoves = (lines) => {
  lines.forEach((line) => {
    if (line.startsWith("move")) {
      const [_, num, __, from, ___, to] = line.split(" ");
      const fromStack = stacks[from];
      const toStack = stacks[to];

      for (let i = 0; i < num; i++) {
        toStack.unshift(fromStack.shift());
      }
    }
  });
};

const processMoves2 = (lines) => {
  lines.forEach((line) => {
    if (line.startsWith("move")) {
      const [_, num, __, from, ___, to] = line.split(" ");
      const fromStack = stacks[from];
      const toStack = stacks[to];

      toStack.unshift(...fromStack.splice(0, num));
    }
  });
};

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  stacks = [[]];
  stackNum = 1;
  nums = [];
  hasLoadedStacks = false;

  const lines = parseInput(rawInput);

  const chunks = lines.map(line => chunk([...line], 4));

  chunks.forEach(chunk => {
    if (hasLoadedStacks) {
      padEmptyStacks();
      return;
    }
    stackNum = 1;
    chunk.forEach((chars) => {
      if (!hasLoadedStacks) {
        extractVal(chars);
      }
    });
  });

  processMoves(lines);

  let res = "";
  stacks.forEach((stack) => {
    if (stack.length) {
      res += stack[0];
    }
  });

  return res;
};

const part2 = (rawInput) => {
  stacks = [[]];
  stackNum = 1;
  nums = [];
  hasLoadedStacks = false;

  const lines = parseInput(rawInput);

  const chunks = lines.map((line) => chunk([...line], 4));

  chunks.forEach((chunk) => {
    if (hasLoadedStacks) {
      padEmptyStacks();
      return;
    }
    stackNum = 1;
    chunk.forEach((chars) => {
      if (!hasLoadedStacks) {
        extractVal(chars);
      }
    });
  });

  processMoves2(lines);

  let res = "";
  stacks.forEach((stack) => {
    if (stack.length) {
      res += stack[0];
    }
  });

  return res;
};

const onlyTests = false;

run({
  part1: {
    tests: [
      {
        input: `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]
[N] [C]
[Z] [M] [P]
  1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests,
});
