import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput.split("\n");

const startCharCode = "S".charCodeAt(0);
const endCharCode = "E".charCodeAt(0);

const part1 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  let startCell;
  let endCell;

  const grid = inputLines.map((line, lineIdx) =>
    [...line].map((char, charIdx) => {
      const code = char.charCodeAt(0);
      if (code === startCharCode) {
        startCell = [lineIdx, charIdx];
        return "a".charCodeAt(0);
      }
      if (code === endCharCode) {
        endCell = [lineIdx, charIdx];
        return "z".charCodeAt(0);
      }
      return code;
    }),
  );

  const visited = new Set();
  const rows = grid.length;
  const columns = grid[0].length;
  const distance = Array(rows)
    .fill()
    .map(() => Array(columns).fill(-1));
  distance[startCell[0]][startCell[1]] = 0;

  const Q = [];
  Q.push(startCell);

  visited.add(startCell.toString());

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let cur;
  let row;
  let col;

  while (Q.length > 0) {
    cur = Q.shift();
    row = cur[0];
    col = cur[1];

    for (let k = 0; k < 4; k++) {
      let newRow = row + dr[k];
      let newCol = col + dc[k];

      if (
        !visited.has([newRow, newCol].toString()) &&
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < rows &&
        newCol < columns &&
        grid[newRow][newCol] - grid[row][col] <= 1
      ) {
        visited.add([newRow, newCol].toString());
        distance[newRow][newCol] = distance[row][col] + 1;
        Q.push([newRow, newCol]);
      }
    }
  }

  const res = distance[endCell[0]][endCell[1]];

  return res;
};

const calcDistanceFromStartCell = (startCell, grid) => {
  const visited = new Set();
  const rows = grid.length;
  const columns = grid[0].length;
  const distance = Array(rows)
    .fill()
    .map(() => Array(columns).fill(-1));
  distance[startCell[0]][startCell[1]] = 0;

  const Q = [];
  Q.push(startCell);

  visited.add(startCell.toString());

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let cur;
  let row;
  let col;

  while (Q.length > 0) {
    cur = Q.shift();
    row = cur[0];
    col = cur[1];

    for (let k = 0; k < 4; k++) {
      let newRow = row + dr[k];
      let newCol = col + dc[k];

      if (
        !visited.has([newRow, newCol].toString()) &&
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < rows &&
        newCol < columns &&
        grid[newRow][newCol] - grid[row][col] <= 1
      ) {
        visited.add([newRow, newCol].toString());
        distance[newRow][newCol] = distance[row][col] + 1;
        Q.push([newRow, newCol]);
      }
    }
  }

  return distance;
};

const part2 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  let startCells = [];
  let endCell;

  const grid = inputLines.map((line, lineIdx) =>
    [...line].map((char, charIdx) => {
      const code = char.charCodeAt(0);
      if (code === startCharCode || code === "a".charCodeAt(0)) {
        startCells.push([lineIdx, charIdx]);
        return "a".charCodeAt(0);
      }
      if (code === endCharCode) {
        endCell = [lineIdx, charIdx];
        return "z".charCodeAt(0);
      }
      return code;
    }),
  );

  const distances = startCells.map((startCell) =>
    calcDistanceFromStartCell(startCell, grid),
  );

  let min = Infinity;
  for (let dist of distances) {
    const thisDist = dist[endCell[0]][endCell[1]];
    if (thisDist !== -1) {
      min = Math.min(min, thisDist);
    }
  }

  return min;
};

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
