import { STATUS } from "../constants.js";

export const convertDueDateToOrderNumber = (dueDate) => {
  if (dueDate === VALID_DUE_DATES.today) {
    return 0;
  }
  if (dueDate === VALID_DUE_DATES.week) {
    return 1;
  }
  if (dueDate === VALID_DUE_DATES.month) {
    return 2;
  }
  if (dueDate === VALID_DUE_DATES.year) {
    return 3;
  }
  if (dueDate === VALID_DUE_DATES.someday || !dueDate) {
    return 4;
  }
};

const isOverdue = (dueDate, timestamp) => {
  if (!dueDate || !timestamp) {
    return false;
  }

  const currentTime = new Date();
  const dueDateTime = new Date(timestamp);

  const dateDiff = currentTime.getDate() - dueDateTime.getDate();

  if (dueDate === VALID_DUE_DATES.today) {
    return dateDiff;
  }

  if (dueDate === VALID_DUE_DATES.week) {
    return dateDiff <= 7 && dateDiff >= 0;
  }

  if (dueDate === VALID_DUE_DATES.month) {
    return currentTime.getMonth() !== dueDateTime.getMonth();
  }

  if (dueDate === VALID_DUE_DATES.year) {
    return currentTime.getFullYear() !== dueDateTime.getFullYear();
  }

  return false;
};

const formatDueDate = (dueDate) => {
  if (dueDate === VALID_DUE_DATES.someday || !dueDate) {
    return "    ";
  } else {
    return `[${dueDate[0]}]:`;
  }
};

export const formatTasks = (tasks) => {
  const formattedTasks = tasks.map((task, index) => {
    const taskNumber = index + 1;
    const formattedTaskNumber =
      taskNumber >= 10 ? taskNumber : ` ${taskNumber}`;
    const formattedDueDate = formatDueDate(task.dueDate);

    const completed = task.status === STATUS.completed;
    const statusIcon = completed ? "\x1b[32m✓\x1b[0m" : " ";

    const taskIsOverdue = isOverdue(task.dueDate, task.timestamp);
    const description = taskIsOverdue
      ? `\x1b[31m${task.description}\x1b[0m`
      : task.description;

    return `${statusIcon} ${formattedTaskNumber} ${formattedDueDate} ${description}`;
  });
  return formattedTasks.join("\n");
};

const formatHeader = (title = "Tasks") => {
  const header = title.toLocaleUpperCase();
  const terminalWidth = Math.min(process.stdout.columns, 80);

  const titleLength = terminalWidth - header.length;
  const sideDecorators = "-".repeat(titleLength / 2 - 1);

  return `${sideDecorators} ${header} ${sideDecorators}`;
};

export const printAllTasks = (tasks) => {
  if (tasks.length == 0) {
    console.log("You don't have any tasks!");
  } else {
    console.log(formatHeader());
    console.log(formatTasks(tasks));
  }
};

const VALID_DUE_DATES = {
  today: "today",
  week: "week",
  month: "month",
  year: "year",
  someday: "someday",
};

export const getDueDate = (argv) => {
  for (const prop in argv) {
    if (argv[prop] === true && prop in VALID_DUE_DATES) {
      return prop;
    }
  }

  return "today";
};
