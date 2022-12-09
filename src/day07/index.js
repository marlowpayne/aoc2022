import run from "aocrunner";

const onlyTests = false;

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const lines = parseInput(rawInput);

  let stack = [];
  const sizes = {};

  lines.forEach((line) => {
    if (/cd \//.test(line)) {
      stack = ["/"];
      sizes["/"] = 0;
    } else if (/cd \.\./.test(line)) {
      stack.pop();
    } else if (line.startsWith("$ cd")) {
      const lastDir = stack[stack.length - 1];
      const dirName =
        lastDir === "/"
          ? line.replace("$ cd ", "")
          : lastDir + "/" + line.replace("$ cd ", "");

      stack.push(dirName);
      sizes[dirName] = 0;
    } else {
      const numMatch = line.match(/(\d+)/);
      if (!numMatch) {
        return;
      }
      const size = Number(numMatch[1]);
      stack.forEach((dir) => {
        sizes[dir] += size;
      });
    }
  });

  let sum = 0;
  Object.keys(sizes).forEach((key) => {
    if (sizes[key] <= 100000) {
      sum += sizes[key];
    }
  });

  return sum;
};

const part2 = (rawInput) => {
  const lines = parseInput(rawInput);

  const totalSpace = 70000000;
  const neededSpace = 30000000;

  let stack = [];
  const sizes = {};

  lines.forEach((line) => {
    if (/cd \//.test(line)) {
      stack = ["/"];
      sizes["/"] = 0;
    } else if (/cd \.\./.test(line)) {
      stack.pop();
    } else if (line.startsWith("$ cd")) {
      const lastDir = stack[stack.length - 1];
      const dirName =
        lastDir === "/"
          ? line.replace("$ cd ", "")
          : lastDir + "/" + line.replace("$ cd ", "");

      stack.push(dirName);
      sizes[dirName] = 0;
    } else {
      const numMatch = line.match(/(\d+)/);
      if (!numMatch) {
        return;
      }
      const size = Number(numMatch[1]);
      stack.forEach((dir) => {
        sizes[dir] += size;
      });
    }
  });

  const unusedSpace = totalSpace - sizes["/"];
  const neededSpaceToDelete = neededSpace - unusedSpace;

  const validDirs = [];
  Object.keys(sizes).forEach((key) => {
    if (sizes[key] >= neededSpaceToDelete) {
      validDirs.push(sizes[key]);
    }
  });

  return Math.min(...validDirs);
};

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
