import { STATUS } from "./constants.js";
import { saveDB, getDB } from "./db.js";
import { convertDueDateToOrderNumber } from "./utils/index.js";

const saveTasks = async (tasks) => {
  await saveDB({ tasks });
};

export const getTasks = async () => {
  const db = await getDB();
  const mappedTasks = db.tasks.map((tasks) => ({
      ...tasks,
      order: convertDueDateToOrderNumber(tasks.dueDate),
    }))
    .sort((a, b) => a.order - b.order);
  return mappedTasks;
};

// TODO: improve complete and other methods to use and ID instead (could be using DBs capabilities)
export const completeTask = async (number) => {
  const taskIndex = number - 1;
  const tasks = await getTasks();
  if (taskIndex >= tasks.length || taskIndex < 0) {
    throw new Error("Task doesn't exist");
  }

  tasks[taskIndex].status = STATUS.completed;
  await saveTasks(tasks);
};

export const clearTasks = async (all) => {
  const tasks = await getTasks();

  if (all) {
    await saveTasks([]);
  } else {
    await saveTasks(tasks.filter((task) => task.status === STATUS.pending));
  }
};

export const addTask = async (description, dueDate) => {
  const timestamp = new Date();
  const newTask = {
    description,
    dueDate,
    timestamp,
    status: STATUS.pending,
  };
  const tasks = await getTasks();

  tasks.push(newTask);

  await saveTasks(tasks);
};
