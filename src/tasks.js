import { STATUS } from "./constants.js";
import { saveDB, getDB } from "./db.js";

const saveTasks = async (tasks) => {
  await saveDB({ tasks });
};

export const getTasks = async () => {
  const db = await getDB();
  return db.tasks;
};

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

export const addTask = async (description) => {
  const newTask = {
    description,
    status: STATUS.pending,
  };
  const tasks = await getTasks();
  
  tasks.push(newTask);
  
  await saveTasks(tasks)
};
