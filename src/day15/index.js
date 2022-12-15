import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  const sensors = inputLines
    .map((line) =>
      line
        .split(":")[0]
        .split(",")
        .map((str) => str.split("=")[1].trim())
        .map(Number),
    )
    .map((sensor) => ({ x: sensor[0], y: sensor[1] }));
  const beacons = inputLines
    .map((line) =>
      line
        .split(":")[1]
        .split(",")
        .map((str) => str.split("=")[1].trim())
        .map(Number),
    )
    .map((beacon) => ({ x: beacon[0], y: beacon[1] }));

  const manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  const xMin = sensors
    .map((sensor, i) => {
      const beacon = beacons[i];
      const distance = manhattanDistance(sensor, beacon);
      return sensor.x - distance;
    })
    .reduce((min, x) => Math.min(min, x), Infinity);

  const xMax = sensors
    .map((sensor, i) => {
      const beacon = beacons[i];
      const distance = manhattanDistance(sensor, beacon);
      return sensor.x + distance;
    })
    .reduce((max, x) => Math.max(max, x), -Infinity);

  const Y_TO_FIND = 2000000;

  let count = 0;
  for (let x = xMin; x <= xMax; x++) {
    const testPoint = { x: x, y: Y_TO_FIND };
    if (
      sensors.some((sensor, i) => {
        const beacon = beacons[i];
        const distance = manhattanDistance(sensor, beacon);
        return (
          distance >= manhattanDistance(sensor, testPoint) &&
          !(beacon.x === x && beacon.y === Y_TO_FIND)
        );
      })
    ) {
      count++;
    }
  }

  return count;
};

const part2 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  const sensors = inputLines
    .map((line) =>
      line
        .split(":")[0]
        .split(",")
        .map((str) => str.split("=")[1].trim())
        .map(Number),
    )
    .map((sensor) => ({ x: sensor[0], y: sensor[1] }));
  const beacons = inputLines
    .map((line) =>
      line
        .split(":")[1]
        .split(",")
        .map((str) => str.split("=")[1].trim())
        .map(Number),
    )
    .map((beacon) => ({ x: beacon[0], y: beacon[1] }));

  const manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  const MAX_SEARCH_DIST = 4000000;
  for (let y = 0; y <= MAX_SEARCH_DIST; y++) {
    for (let x = 0; x <= MAX_SEARCH_DIST; x++) {
      let flag = false;
      for (let s = 0; s < sensors.length; s++) {
        const sensor = sensors[s];
        const beacon = beacons[s];
        const distance = manhattanDistance(sensor, beacon);
        const testDistance = manhattanDistance(sensor, { x, y });
        if (testDistance <= distance) {
          x = Math.max(x, sensor.x + (distance - Math.abs(sensor.y - y)));
          flag = true;
          break;
        }
      }
      if (!flag) {
        return 4000000 * x + y;
      }
    }
  }

  return;
};

run({
  part1: {
    tests: [
      {
        input: `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`,
        expected: 56000011,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
