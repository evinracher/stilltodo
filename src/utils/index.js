import { STATUS } from "../constants.js";

export const formatTasks = (tasks) => {
  const formattedTasks = tasks.map((task, index) => {
    const taskNumber = index + 1;
    const formattedTaskNumber = taskNumber >= 10 ? taskNumber : ` ${taskNumber}`;
    const completed = task.status === STATUS.completed;
    const statusIcon = completed ? "\x1b[32m✓\x1b[0m" : " ";

    return `${statusIcon} ${formattedTaskNumber}. ${task.description}`;
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
