import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import { handlers } from "./cli.js";

yargs(hideBin(process.argv))
  .strict()
  .strictCommands()
  .strictOptions()
  .recommendCommands()
  .fail(handlers.fail)
  .command(
    "$0 <description>",
    "add a new task",
    (yargs) =>
      yargs.positional("description", {
        type: "string",
        describe: "Task description",
      }),
    handlers.add,
  )
  .option("today", {
    alias: "t",
    type: "boolean",
    description: "the deadline for this task is today",
    default: true,
  })
  .option("week", {
    alias: "w",
    type: "boolean",
    description: "the deadline for this task is this week",
  })
  .option("month", {
    alias: "m",
    type: "boolean",
    description: "the deadline for this task is this month",
  })
  .option("year", {
    alias: "y",
    type: "boolean",
    description: "the deadline for this task is this year",
  })
  .option("someday", {
    alias: "s",
    type: "boolean",
    description: "the deadline for this task is someday",
  })
  .command("all", "get all tasks", () => {}, handlers.getAll)
  .command(
    "complete <number>",
    "complete task n° <number>",
    (yargs) => {
      return yargs.positional("number", {
        type: "number",
        description: "The number of the task you want to mark as completed",
      });
    },
    handlers.complete,
  )
  .command("clear", "remove completed tasks", () => {}, handlers.clear)
  .option("all", {
    alias: "a",
    type: "boolean",
    description: "remove all tasks",
  })
  .parse();
