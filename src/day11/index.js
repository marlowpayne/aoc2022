import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput.split("\n\n");

const part1 = (rawInput) => {
  const monkeys = parseInput(rawInput).map((monkey) => {
    const lines = monkey.split("\n");
    const startingItems = lines[1].split(": ")[1].split(", ").map(Number);
    const operation = lines[2].split(": ")[1];
    const test = lines[3].split(": ")[1];
    const ifTrue = lines[4].split(": ")[1];
    const ifFalse = lines[5].split(": ")[1];

    return {
      items: startingItems,
      operation,
      test,
      ifTrue,
      ifFalse,
      inspectionCount: 0,
    };
  });

  const performInspection = (monkey) => {
    const { items, operation, test, ifTrue, ifFalse } = monkey;
    const divisibleBy = Number(test.split(" ")[2]);

    while (items.length > 0) {
      const item = items.shift();
      monkey.inspectionCount++;
      let newItem = item;
      const operand = operation.split("old ")[1].split(" ")[0];
      const operator = operation.split("old ")[1].split(" ")[1];

      switch (operand) {
        case "*":
          if (operator === "old") {
            newItem = item * item;
            break;
          }
          newItem = item * Number(operator);
          break;
        case "+":
          newItem = item + Number(operator);
          break;
      }
      newItem = Math.floor(newItem / 3);
      if (newItem % divisibleBy === 0) {
        const newMonkey = Number(ifTrue.split(" ")[3]);
        monkeys[newMonkey].items.push(newItem);
      } else {
        const newMonkey = Number(ifFalse.split(" ")[3]);
        monkeys[newMonkey].items.push(newItem);
      }
    }
  };

  for (let round = 0; round < 20; round++) {
    monkeys.forEach((monkey) => {
      performInspection(monkey);
    });
  }

  monkeys.sort((a, b) => b.inspectionCount - a.inspectionCount);

  const res = monkeys[0].inspectionCount * monkeys[1].inspectionCount;

  return res;
};

const part2 = (rawInput) => {
  const monkeys = parseInput(rawInput).map((monkey) => {
    const lines = monkey.split("\n");
    const startingItems = lines[1].split(": ")[1].split(", ").map(Number);
    const operation = lines[2].split(": ")[1];
    const test = lines[3].split(": ")[1];
    const ifTrue = lines[4].split(": ")[1];
    const ifFalse = lines[5].split(": ")[1];

    return {
      items: startingItems,
      operation,
      test: Number(test.split(" ")[2]),
      ifTrue,
      ifFalse,
      inspectionCount: 0,
    };
  });

  const commonDivisor = monkeys.reduce((acc, monkey) => acc * monkey.test, 1);

  const performInspection = (monkey) => {
    const { items, operation, test, ifTrue, ifFalse } = monkey;

    while (items.length > 0) {
      const item = items.shift();

      monkey.inspectionCount++;

      let newItem = item;
      const operand = operation.split("old ")[1].split(" ")[0];
      const operator = operation.split("old ")[1].split(" ")[1];

      switch (operand) {
        case "*":
          if (operator === "old") {
            newItem = item * item;
            break;
          }
          newItem = item * Number(operator);
          break;
        case "+":
          newItem = item + Number(operator);
          break;
      }

      newItem = newItem % commonDivisor;

      if (newItem % test === 0) {
        const newMonkey = Number(ifTrue.split(" ")[3]);
        monkeys[newMonkey].items.push(newItem);
      } else {
        const newMonkey = Number(ifFalse.split(" ")[3]);
        monkeys[newMonkey].items.push(newItem);
      }
    }
  };

  for (let round = 0; round < 10000; round++) {
    monkeys.forEach((monkey) => {
      performInspection(monkey);
    });
  }

  monkeys.sort((a, b) => b.inspectionCount - a.inspectionCount);

  const res = monkeys[0].inspectionCount * monkeys[1].inspectionCount;

  return res;
};

run({
  part1: {
    tests: [
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
