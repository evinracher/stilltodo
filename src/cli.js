import { addTask, clearTasks, completeTask, getTasks } from "./tasks.js";
import { getDueDate, printAllTasks } from "./utils/index.js";

const getAll = async (_) => {
  const tasks = await getTasks();
  printAllTasks(tasks);
};

const complete = async (argv) => {
  try {
    await completeTask(argv.number);
    console.error("Task has been completed!");
    await getAll();
  } catch (error) {
    console.error(error.message);
  }
};

const add = async (argv) => {
  const dueDate = getDueDate(argv);
  const description = argv.description
  await addTask(description, dueDate);
  await getAll();
};

const clear = async (argv) => {
  await clearTasks(argv.all);
  await getAll();
};

const fail = (msg, err, _) => {
  if (err) throw err;

  console.error("❌ Error:", msg);
  console.error("\nRun --help to see available commands.\n");

  process.exit(1);
};

export const handlers = {
  add,
  getAll,
  complete,
  clear,
  fail,
};
