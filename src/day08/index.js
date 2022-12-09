import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const lines = parseInput(rawInput);

  const grid = lines.map((line) => line.split("").map(num => parseInt(num)));

  const gridSize = grid[0].length;

  const visibility = Array(gridSize).fill(1).map(() => Array(gridSize).fill(1));

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (i === 0 || j === 0 || i === gridSize - 1 || j === gridSize - 1) {
        visibility[i][j] = 1;
      } else {
        const thisHeight = grid[i][j];
        let k = 1;
        let visTop = 1;
        let visBottom = 1;
        let visRight = 1;
        let visLeft = 1;

        while (i-k >= 0) {
          let top = grid[i-k][j];
          if (top >= thisHeight) {
            visTop = 0;
            break;
          }
          k++;
        }

        k = 1;
        while (i+k < gridSize) {
          let bottom = grid[i+k][j];
          if (bottom >= thisHeight) {
            visBottom = 0;
            break;
          }
          k++;
        }

        k = 1;
        while (j+k < gridSize) {
          let right = grid[i][j+k];
          if (right >= thisHeight) {
            visRight = 0;
            break;
          }
          k++;
        }

        k = 1;
        while (j-k >= 0) {
          let left = grid[i][j-k];
          if (left >= thisHeight) {
            visLeft = 0;
            break;
          }
          k++;
        }

        if (visTop + visBottom + visRight + visLeft === 0) {
          visibility[i][j] = 0;
        }
      }
    }
  }

  return visibility.reduce((acc, row) => acc + row.reduce((acc, val) => acc + val, 0), 0);
};

const part2 = (rawInput) => {
  const lines = parseInput(rawInput);

  const grid = lines.map((line) => line.split("").map((num) => parseInt(num)));

  const gridSize = grid[0].length;

  let maxView = 0;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (i === 0 || j === 0 || i === gridSize - 1 || j === gridSize - 1) {
        continue;
      } else {
        const thisHeight = grid[i][j];
        let view = 1;
        let k = 1;

        while (i - k > 0) {
          let top = grid[i - k][j];
          if (top >= thisHeight) {
            break;
          }
          k++;
        }
        view = view * k;

        k = 1;
        while (i + k < gridSize - 1) {
          let bottom = grid[i + k][j];
          if (bottom >= thisHeight) {
            break;
          }
          k++;
        }
        view = view * k;

        k = 1;
        while (j + k < gridSize - 1) {
          let right = grid[i][j + k];
          if (right >= thisHeight) {
            break;
          }
          k++;
        }
        view = view * k;

        k = 1;
        while (j - k > 0) {
          let left = grid[i][j - k];
          if (left >= thisHeight) {
            break;
          }
          k++;
        }
        view = view * k;

        if (view > maxView) {
          maxView = view;
        }
      }
    }
  }

  return maxView;
};

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
