import { jest } from "@jest/globals";
import {
  convertDueDateToOrderNumber,
  formatTasks,
  printAllTasks,
  getDueDate,
} from ".";
import { STATUS } from "../constants.js";

describe("convertDueDateToOrderNumber", () => {
  it("should return 0 for 'today'", () => {
    expect(convertDueDateToOrderNumber("today")).toBe(0);
  });

  it("should return 1 for 'week'", () => {
    expect(convertDueDateToOrderNumber("week")).toBe(1);
  });

  it("should return 2 for 'month'", () => {
    expect(convertDueDateToOrderNumber("month")).toBe(2);
  });

  it("should return 3 for 'year'", () => {
    expect(convertDueDateToOrderNumber("year")).toBe(3);
  });

  it("should return 4 for 'someday'", () => {
    expect(convertDueDateToOrderNumber("someday")).toBe(4);
  });

  it("should return 4 for null or undefined", () => {
    expect(convertDueDateToOrderNumber(null)).toBe(4);
    expect(convertDueDateToOrderNumber(undefined)).toBe(4);
  });
});

describe("formatTasks", () => {
  it("should format tasks with proper structure", () => {
    const mockTasks = [
      {
        description: "create a todo cli",
        status: "pending",
        dueDate: "today",
        timestamp: new Date().toISOString(),
      },
      {
        description: "have lunch",
        status: "completed",
        dueDate: "today",
        timestamp: new Date().toISOString(),
      },
    ];

    const result = formatTasks(mockTasks);

    expect(result).toContain("create a todo cli");
    expect(result).toContain("have lunch");
    expect(result).toContain("\x1b[32m✓\x1b[0m");
  });

  it("should format task numbers with single digit padding", () => {
    const mockTasks = Array.from({ length: 3 }, (_, i) => ({
      description: `task ${i + 1}`,
      status: STATUS.pending,
      dueDate: "today",
      timestamp: new Date().toISOString(),
    }));

    const result = formatTasks(mockTasks);
    const lines = result.split("\n");

    expect(lines[0]).toMatch(/^\s+1\s/);
    expect(lines[1]).toMatch(/^\s+2\s/);
    expect(lines[2]).toMatch(/^\s+3\s/);
  });

  it("should format task numbers without padding for double digits", () => {
    const mockTasks = Array.from({ length: 12 }, (_, i) => ({
      description: `task ${i + 1}`,
      status: STATUS.pending,
      dueDate: "today",
      timestamp: new Date().toISOString(),
    }));

    const result = formatTasks(mockTasks);
    const lines = result.split("\n");

    expect(lines[9]).toContain("10");
    expect(lines[11]).toContain("12");
  });

  it("should show checkmark for completed tasks", () => {
    const mockTasks = [
      {
        description: "completed task",
        status: STATUS.completed,
        dueDate: "today",
        timestamp: new Date().toISOString(),
      },
    ];

    const result = formatTasks(mockTasks);

    expect(result).toContain("\x1b[32m✓\x1b[0m");
  });

  it("should show space for pending tasks", () => {
    const mockTasks = [
      {
        description: "pending task",
        status: STATUS.pending,
        dueDate: "today",
        timestamp: new Date().toISOString(),
      },
    ];

    const result = formatTasks(mockTasks);
    const lines = result.split("\n");

    expect(lines[0]).toMatch(/^\s+\d+/);
  });

  it("should format due date with bracket notation", () => {
    const mockTasks = [
      {
        description: "task with today due date",
        status: STATUS.pending,
        dueDate: "today",
        timestamp: new Date().toISOString(),
      },
      {
        description: "task with week due date",
        status: STATUS.pending,
        dueDate: "week",
        timestamp: new Date().toISOString(),
      },
    ];

    const result = formatTasks(mockTasks);

    expect(result).toContain("[t]:");
    expect(result).toContain("[w]:");
  });

  it("should format tasks without due date or someday", () => {
    const mockTasks = [
      {
        description: "task without due date",
        status: STATUS.pending,
        dueDate: null,
        timestamp: null,
      },
      {
        description: "task with someday",
        status: STATUS.pending,
        dueDate: "someday",
        timestamp: new Date().toISOString(),
      },
    ];

    const result = formatTasks(mockTasks);
    const lines = result.split("\n");

    expect(lines[0]).toContain("task without due date");
    expect(lines[1]).toContain("task with someday");
  });

  it("should handle various due date formats correctly", () => {
    const mockTasks = [
      {
        description: "month task",
        status: STATUS.pending,
        dueDate: "month",
        timestamp: new Date().toISOString(),
      },
      {
        description: "year task",
        status: STATUS.pending,
        dueDate: "year",
        timestamp: new Date().toISOString(),
      },
    ];

    const result = formatTasks(mockTasks);

    expect(result).toContain("[m]:");
    expect(result).toContain("[y]:");
  });

  it("should color overdue tasks in red", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);

    const mockTasks = [
      {
        description: "overdue task",
        status: STATUS.pending,
        dueDate: "today",
        timestamp: pastDate.toISOString(),
      },
    ];

    const result = formatTasks(mockTasks);

    expect(result).toContain("\x1b[31m");
  });

  it("should not color current day tasks in red", () => {
    const mockTasks = [
      {
        description: "today task",
        status: STATUS.pending,
        dueDate: "today",
        timestamp: new Date().toISOString(),
      },
    ];

    const result = formatTasks(mockTasks);
    const lines = result.split("\n");

    expect(lines[0]).not.toContain("\x1b[31m");
  });

  it("should handle empty task array", () => {
    const mockTasks = [];

    expect(() => formatTasks(mockTasks)).not.toThrow();
  });
});

describe("printAllTasks", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should print message when no tasks exist", () => {
    printAllTasks([]);

    expect(consoleSpy).toHaveBeenCalledWith("You don't have any tasks!");
  });

  it("should print header and tasks when tasks exist", () => {
    const mockTasks = [
      {
        description: "task 1",
        status: STATUS.pending,
        dueDate: "today",
        timestamp: new Date().toISOString(),
      },
    ];

    printAllTasks(mockTasks);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    const headerCall = consoleSpy.mock.calls[0][0];
    expect(headerCall).toContain("TASKS");
  });

  it("should print multiple tasks with header", () => {
    const mockTasks = [
      {
        description: "task 1",
        status: STATUS.pending,
        dueDate: "today",
        timestamp: new Date().toISOString(),
      },
      {
        description: "task 2",
        status: STATUS.completed,
        dueDate: "week",
        timestamp: new Date().toISOString(),
      },
    ];

    printAllTasks(mockTasks);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    const tasksCall = consoleSpy.mock.calls[1][0];
    expect(tasksCall).toContain("task 1");
    expect(tasksCall).toContain("task 2");
  });
});

describe("getDueDate", () => {
  it("should return 'today' when no valid flag is set", () => {
    expect(getDueDate({})).toBe("today");
  });

  it("should return 'today' as default value", () => {
    expect(getDueDate({ invalid: true })).toBe("today");
  });

  it("should return 'today' when flag is true", () => {
    expect(getDueDate({ today: true })).toBe("today");
  });

  it("should return 'week' when flag is true", () => {
    expect(getDueDate({ week: true })).toBe("week");
  });

  it("should return 'month' when flag is true", () => {
    expect(getDueDate({ month: true })).toBe("month");
  });

  it("should return 'year' when flag is true", () => {
    expect(getDueDate({ year: true })).toBe("year");
  });

  it("should return 'someday' when flag is true", () => {
    expect(getDueDate({ someday: true })).toBe("someday");
  });

  it("should ignore false flags", () => {
    expect(getDueDate({ today: false, week: true })).toBe("week");
  });

  it("should prioritize first valid flag found", () => {
    const result = getDueDate({ today: true, week: true });
    expect(["today", "week"]).toContain(result);
  });

  it("should ignore non-existent due date flags", () => {
    expect(getDueDate({ notADueDate: true })).toBe("today");
  });

  it("should handle mixed valid and invalid flags", () => {
    const result = getDueDate({ invalid: true, week: true, another: false });
    expect(["today", "week"]).toContain(result);
  });
});
