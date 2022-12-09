import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };
  const visited = new Set();

  const markTailVisit = () => visited.add(`${tail.x},${tail.y}`);
  markTailVisit(); // starting position counts as visited

  const moveTail = () => {
    if (Math.abs(tail.x - head.x) > 1) {
      // moving horizontally
      if (tail.x < head.x) {
        // moving right
        if (tail.y < head.y) {
          // moving right and up
          tail.y++;
        } else if (tail.y > head.y) {
          // moving right and down
          tail.y--;
        }
        tail.x++;
      } else {
        // moving left
        if (tail.y > head.y) {
          // moving left and down
          tail.y--;
        } else if (tail.y < head.y) {
          // moving left and up
          tail.y++;
        }
        tail.x--;
      }
    } else if (Math.abs(tail.y - head.y) > 1) {
      // moving vertically
      if (tail.y < head.y) {
        // moving up
        if (tail.x < head.x) {
          // moving up and right
          tail.x++;
        } else if (tail.x > head.x) {
          // moving up and left
          tail.x--;
        }
        tail.y++;
      } else {
        // moving down
        if (tail.x > head.x) {
          // moving down and left
          tail.x--;
        } else if (tail.x < head.x) {
          // moving down and right
          tail.x++;
        }
        tail.y--;
      }
    }
    markTailVisit();
  };

  const moveHead = (dir, dist) => {
    switch (dir) {
      case "U":
        for (let d = 0; d < dist; d++) {
          head.y++;
          moveTail();
        }
        break;
      case "D":
        for (let d = 0; d < dist; d++) {
          head.y--;
          moveTail();
        }
        break;
      case "L":
        for (let d = 0; d < dist; d++) {
          head.x--;
          moveTail();
        }
        break;
      case "R":
        for (let d = 0; d < dist; d++) {
          head.x++;
          moveTail();
        }
        break;
    }
  };

  inputLines.forEach((line) => {
    const [dir, dist] = line.split(" ");
    moveHead(dir, parseInt(dist));
  });

  return visited.size;
};

const part2 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  const head = { x: 0, y: 0 };
  const knot1 = { x: 0, y: 0 };
  const knot2 = { x: 0, y: 0 };
  const knot3 = { x: 0, y: 0 };
  const knot4 = { x: 0, y: 0 };
  const knot5 = { x: 0, y: 0 };
  const knot6 = { x: 0, y: 0 };
  const knot7 = { x: 0, y: 0 };
  const knot8 = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };

  const knots = [
    head,
    knot1,
    knot2,
    knot3,
    knot4,
    knot5,
    knot6,
    knot7,
    knot8,
    tail,
  ];

  const visited = new Set();

  const markTailVisit = () => visited.add(`${tail.x},${tail.y}`);
  markTailVisit(); // starting position counts as visited

  const moveKnots = (leader, follower) => {
    if (Math.abs(follower.x - leader.x) > 1) {
      // moving horizontally
      if (follower.x < leader.x) {
        // moving right
        if (follower.y < leader.y) {
          // moving right and up
          follower.y++;
        } else if (follower.y > leader.y) {
          // moving right and down
          follower.y--;
        }
        follower.x++;
      } else {
        // moving left
        if (follower.y > leader.y) {
          // moving left and down
          follower.y--;
        } else if (follower.y < leader.y) {
          // moving left and up
          follower.y++;
        }
        follower.x--;
      }
    } else if (Math.abs(follower.y - leader.y) > 1) {
      // moving vertically
      if (follower.y < leader.y) {
        // moving up
        if (follower.x < leader.x) {
          // moving up and right
          follower.x++;
        } else if (follower.x > leader.x) {
          // moving up and left
          follower.x--;
        }
        follower.y++;
      } else {
        // moving down
        if (follower.x > leader.x) {
          // moving down and left
          follower.x--;
        } else if (follower.x < leader.x) {
          // moving down and right
          follower.x++;
        }
        follower.y--;
      }
    }
    markTailVisit();
  };

  const moveTail = () => {
    // iteratively move all knots to update tail
    for (let i = 1; i < knots.length; i++) {
      moveKnots(knots[i - 1], knots[i]);
    }
  };

  const moveHead = (dir, dist) => {
    switch (dir) {
      case "U":
        for (let d = 0; d < dist; d++) {
          head.y++;
          moveTail();
        }
        break;
      case "D":
        for (let d = 0; d < dist; d++) {
          head.y--;
          moveTail();
        }
        break;
      case "L":
        for (let d = 0; d < dist; d++) {
          head.x--;
          moveTail();
        }
        break;
      case "R":
        for (let d = 0; d < dist; d++) {
          head.x++;
          moveTail();
        }
        break;
    }
  };

  inputLines.forEach((line) => {
    const [dir, dist] = line.split(" ");
    moveHead(dir, parseInt(dist));
  });

  return visited.size;
};

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 1,
      },
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
