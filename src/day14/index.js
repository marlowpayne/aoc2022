import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  const rockPaths = inputLines.map((line) =>
    line.split(" -> ").map((coordPair) => {
      const [x, y] = coordPair.split(",").map((n) => parseInt(n, 10));
      return { x, y };
    }),
  );

  // Fill in the rest of the rock paths
  for (let p = 0; p < rockPaths.length; p++) {
    const rockPath = rockPaths[p];
    for (let r = 0; r < rockPath.length - 1; r++) {
      const rock = rockPath[r];
      const nextRock = rockPath[r + 1];
      const dx = nextRock.x - rock.x;
      const dy = nextRock.y - rock.y;
      for (let i = 1; i < Math.max(Math.abs(dx), Math.abs(dy)); i++) {
        rockPath.splice(r + i, 0, {
          x: rock.x + i * Math.sign(dx),
          y: rock.y + i * Math.sign(dy),
        });
      }
    }
  }

  // Flatten rock paths to a single array of rock coordinates
  const rocks = rockPaths.flat().sort((a, b) => a.y - b.y);

  const SAND_START = { x: 500, y: 0 };
  const BOTTOM_THRESHOLD = rocks[rocks.length - 1].y + 1;

  const isCollision = (sand) =>
    rocks.find((rock) => rock.x === sand.x && rock.y === sand.y);

  const dropNewSand = () => {
    let sand = SAND_START;
    let stillMoving = true;
    while (stillMoving) {
      let nextSandPos = { x: sand.x, y: sand.y + 1 };
      if (isCollision(nextSandPos)) {
        // Collision, check first diagonal
        nextSandPos = { x: sand.x - 1, y: sand.y + 1 };
        if (isCollision(nextSandPos)) {
          // Another collision, check second diagonal
          nextSandPos = { x: sand.x + 1, y: sand.y + 1 };
          if (isCollision(nextSandPos)) {
            // Another collision, stop moving
            stillMoving = false;
            break;
          }
        }
      }
      if (nextSandPos.y >= BOTTOM_THRESHOLD) {
        // Reached bottom, stop moving
        stillMoving = false;
        break;
      }
      // No collision, move sand
      sand = nextSandPos;
    }
    // Sand stopped moving, return position to add to rocks
    return sand;
  };

  let count = 0;
  while (true) {
    const newSand = dropNewSand();
    if (newSand.y >= BOTTOM_THRESHOLD) {
      break;
    }
    rocks.push(newSand);
    count++;
  }

  return count;
};

const part2 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  const rockPaths = inputLines.map((line) =>
    line.split(" -> ").map((coordPair) => {
      const [x, y] = coordPair.split(",").map((n) => parseInt(n, 10));
      return { x, y };
    }),
  );

  // Fill in the rest of the rock paths
  for (let p = 0; p < rockPaths.length; p++) {
    const rockPath = rockPaths[p];
    for (let r = 0; r < rockPath.length - 1; r++) {
      const rock = rockPath[r];
      const nextRock = rockPath[r + 1];
      const dx = nextRock.x - rock.x;
      const dy = nextRock.y - rock.y;
      for (let i = 1; i < Math.max(Math.abs(dx), Math.abs(dy)); i++) {
        rockPath.splice(r + i, 0, {
          x: rock.x + i * Math.sign(dx),
          y: rock.y + i * Math.sign(dy),
        });
      }
    }
  }

  // Flatten rock paths to a single array of rock coordinates
  const rocks = rockPaths.flat().sort((a, b) => a.y - b.y);

  const SAND_START = { x: 500, y: 0 };
  const FLOOR = rocks[rocks.length - 1].y + 2;

  // Use a set for faster lookup
  const rockSet = new Set(rocks.map((rock) => `${rock.x},${rock.y}`));

  const isCollision = (sand) => rockSet.has(`${sand.x},${sand.y}`);

  const dropNewSand = () => {
    let sand = SAND_START;
    let stillMoving = true;
    while (stillMoving) {
      let nextSandPos = { x: sand.x, y: sand.y + 1 };
      if (nextSandPos.y >= FLOOR) {
        stillMoving = false;
        break;
      }
      if (isCollision(nextSandPos)) {
        // Collision, check first diagonal
        nextSandPos = { x: sand.x - 1, y: sand.y + 1 };
        if (isCollision(nextSandPos)) {
          // Another collision, check second diagonal
          nextSandPos = { x: sand.x + 1, y: sand.y + 1 };
          if (isCollision(nextSandPos)) {
            // Another collision, stop moving
            stillMoving = false;
            break;
          }
        }
      }
      // No collision, move sand
      sand = nextSandPos;
    }
    // Sand stopped moving, return position to add to rocks
    return sand;
  };

  let count = 0;
  while (true) {
    const newSand = dropNewSand();
    if (newSand === SAND_START) {
      break;
    }
    rockSet.add(`${newSand.x},${newSand.y}`);
    count++;
  }

  return count + 1;
};

run({
  part1: {
    tests: [
      {
        input: `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
