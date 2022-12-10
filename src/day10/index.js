import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput.split("\n");

const runInstruction = (instruction, reg, cycle, sum) => {
  const prevCycle = cycle;

  switch (instruction.op) {
    case "noop":
      cycle++;
      if (
        cycle === 20 ||
        cycle === 60 ||
        cycle === 100 ||
        cycle === 140 ||
        cycle === 180 ||
        cycle === 220
      ) {
        sum += reg * cycle;
      }
      break;
    case "addx":
      if (
        prevCycle === 19 ||
        prevCycle === 59 ||
        prevCycle === 99 ||
        prevCycle === 139 ||
        prevCycle === 179 ||
        prevCycle === 219
      ) {
        sum += reg * (cycle + 1);
      }
      cycle += 2;
      if (
        cycle === 20 ||
        cycle === 60 ||
        cycle === 100 ||
        cycle === 140 ||
        cycle === 180 ||
        cycle === 220
      ) {
        sum += reg * cycle;
      }
      reg += instruction.arg;
      break;
  }

  return { reg, cycle, sum };
};

const part1 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  let reg = 1;
  let cycle = 0;
  let sum = 0;

  const instructions = inputLines.map((line) => {
    const [op, arg] = line.split(" ");
    return { op, arg: Number(arg) };
  });

  instructions.forEach((instruction) => {
    const res = runInstruction(instruction, reg, cycle, sum);
    reg = res.reg;
    cycle = res.cycle;
    sum = res.sum;
  });

  return sum;
};

const drawPixel = (screen, reg, cycle) => {
  const row = Math.floor(cycle / 40);
  const col = (cycle % 40) - 1;

  if (Math.abs(reg - col) <= 1) {
    const newLine = screen[row].substring(0, col) + "#" + screen[row].substring(col + 1);
    screen[row] = newLine;
  }

  return screen;
};

const printScreenFromInstruction = (instruction, reg, cycle, screen) => {
  switch (instruction.op) {
    case "noop":
      cycle++;
      screen = drawPixel(screen, reg, cycle);
      break;
    case "addx":
      cycle++;
      screen = drawPixel(screen, reg, cycle);
      cycle++;
      screen = drawPixel(screen, reg, cycle);
      reg += instruction.arg;
      break;
  }

  return { reg, cycle, screen };
};

const part2 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  const blankLine = "........................................";
  let screen = Array(6).fill(blankLine);

  let reg = 1;
  let cycle = 0;

  const instructions = inputLines.map((line) => {
    const [op, arg] = line.split(" ");
    return { op, arg: Number(arg) };
  });

  instructions.forEach((instruction) => {
    const res = printScreenFromInstruction(instruction, reg, cycle, screen);
    reg = res.reg;
    cycle = res.cycle;
    screen = res.screen;
  });

  console.log(screen);

  return "EZFPRAKL";
};

const exampleScreenOutput = [
  "##..##..##..##..##..##..##..##..##..##..",
  "###...###...###...###...###...###...###.",
  "####....####....####....####....####....",
  "#####.....#####.....#####.....#####.....",
  "######......######......######......####",
  "#######.......#######.......#######.....",
];

run({
  part1: {
    tests: [
      {
        input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      //       {
      //         input: `addx 15
      // addx -11
      // addx 6
      // addx -3
      // addx 5
      // addx -1
      // addx -8
      // addx 13
      // addx 4
      // noop
      // addx -1
      // addx 5
      // addx -1
      // addx 5
      // addx -1
      // addx 5
      // addx -1
      // addx 5
      // addx -1
      // addx -35
      // addx 1
      // addx 24
      // addx -19
      // addx 1
      // addx 16
      // addx -11
      // noop
      // noop
      // addx 21
      // addx -15
      // noop
      // noop
      // addx -3
      // addx 9
      // addx 1
      // addx -3
      // addx 8
      // addx 1
      // addx 5
      // noop
      // noop
      // noop
      // noop
      // noop
      // addx -36
      // noop
      // addx 1
      // addx 7
      // noop
      // noop
      // noop
      // addx 2
      // addx 6
      // noop
      // noop
      // noop
      // noop
      // noop
      // addx 1
      // noop
      // noop
      // addx 7
      // addx 1
      // noop
      // addx -13
      // addx 13
      // addx 7
      // noop
      // addx 1
      // addx -33
      // noop
      // noop
      // noop
      // addx 2
      // noop
      // noop
      // noop
      // addx 8
      // noop
      // addx -1
      // addx 2
      // addx 1
      // noop
      // addx 17
      // addx -9
      // addx 1
      // addx 1
      // addx -3
      // addx 11
      // noop
      // noop
      // addx 1
      // noop
      // addx 1
      // noop
      // noop
      // addx -13
      // addx -19
      // addx 1
      // addx 3
      // addx 26
      // addx -30
      // addx 12
      // addx -1
      // addx 3
      // addx 1
      // noop
      // noop
      // noop
      // addx -9
      // addx 18
      // addx 1
      // addx 2
      // noop
      // noop
      // addx 9
      // noop
      // noop
      // noop
      // addx -1
      // addx 2
      // addx -37
      // addx 1
      // addx 3
      // noop
      // addx 15
      // addx -21
      // addx 22
      // addx -6
      // addx 1
      // noop
      // addx 2
      // addx 1
      // noop
      // addx -10
      // noop
      // noop
      // addx 20
      // addx 1
      // addx 2
      // addx 2
      // addx -6
      // addx -11
      // noop
      // noop
      // noop`,
      //         expected: exampleScreenOutput,
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
