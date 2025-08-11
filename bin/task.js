#!/usr/bin/env node
import {
  addTask,
  listTasks,
  deleteAllTask,
  getTask,
  updateTask,
  deleteTask,
} from "../src/tasks.js";
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf8")
);

const program = new Command();
program.name("task").version(pkg.version);

program
  .command("add <description>")
  .description("Add a task")
  .option("-s, --status <status>", "status (todo, in-progress, done)", "todo")
  .action((description, opts) => {
    const t = addTask(description, { status: opts.status });
    console.log(chalk.green(`Added [${t.id}] ${t.description}`));
  });

function printTask(list) {
  list.forEach((task) => {
    let statusColor;
    if (task.status === "done") statusColor = chalk.green(task.status);
    else if (task.status === "in-progress")
      statusColor = chalk.blue(task.status);
    else statusColor = chalk.gray(task.status);

    console.log(
      `${task.id}  ${task.createdAt}  ${task.updatedAt || ""} ${statusColor}  ${
        task.description
      }`
    );
  });
}

program
  .command("list [status]")
  .description(
    "List tasks (optionally filter by status: done, in-progress, notdone)"
  )
  .action((status) => {
    const allowed = ["done", "in-progress", "notdone", "todo", undefined];

    if (!allowed.includes(status)) {
      console.error(chalk.red("Invalid status! Use: done, in-progress, todo"));
      process.exit(1);
    }
    const list = listTasks(status);
    if (!list) {
      console.log(chalk.yellow("No task found"));
      return;
    }
    printTask(list);
  });

program
  .command("mark <id> <status>")
  .description("Mark status (status: done, in-progress, notdone)")
  .action((id, status) => {
    const allowed = ["done", "in-progress", "todo"];

    if (!allowed.includes(status)) {
      console.error(chalk.red("Invalid status! Use: done, in-progress, todo"));
      process.exit(1);
    }
    const task = updateTask(id, { status: status });
    if (!task) {
      console.log(chalk.yellow("Task not found"));
      return;
    }
    printTask([task]);
  });

program
  .command("get <id>")
  .description("Get task by ID")
  .action((id) => {
    const task = getTask(id);
    if (!task) {
      console.log(chalk.yellow("No task found"));
      return;
    }
    printTask([task]);
  });

program
  .command("update <id> <description>")
  .description("Update a task with ID")
  .action((id, description) => {
    const t = updateTask(id, { description: description });
    if (!t) {
      console.log(chalk.yellow("Task not found"));
      return;
    }
    console.log(chalk.green(`Updated [${t.id}] ${t.description}`));
  });

program
  .command("delete <id>")
  .description("Delete a task with ID")
  .action((id) => {
    const t = deleteTask(id);
    if (!t) {
      console.log(chalk.yellow("Task not found"));
      return;
    }
    console.log(chalk.green(`Deleted [${t.id}] ${t.description}`));
  });

program
  .command("deleteAll")
  .description("delete all the task")
  .action(() => deleteAllTask());

program.parse(process.argv);
