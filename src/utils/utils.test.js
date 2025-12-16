import { formatTasks } from ".";

const mockTasks = [
  {
    description: "create a todo cli",
    status: "pending",
  },
  {
    description: "have lunch",
    status: "completed",
  },
];

describe("utils", () => {
  it("format tasks", () => {
    const expected = `   1. create a todo cli\n\x1b[32m✓\x1b[0m  2. have lunch`;

    const result = formatTasks(mockTasks);

    expect(result).toEqual(expected);
  });
});
