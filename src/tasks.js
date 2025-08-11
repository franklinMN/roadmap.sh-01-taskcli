import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "tasks.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
}

function readTasks() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf8") || "[]";
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeTasks(tasks) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf8");
}

export function addTask(description, { status = "todo" } = {}) {
  const tasks = readTasks();
  const task = {
    id: uuidv4().split("-")[0],
    description,
    status,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };
  tasks.push(task);
  writeTasks(tasks);
  return task;
}

export function listTasks(status) {
  const tasks = readTasks();

  if (status === undefined) return tasks;

  let filtered = tasks;

  if (status === "notdone") {
    filtered = tasks.filter((t) => t.status !== "done");
  } else {
    filtered = tasks.filter((t) => t.status === status);
  }

  if (filtered.length === 0) return null;

  return filtered;
}

export function getTask(id) {
  const tasks = readTasks();
  return tasks.find((t) => t.id === id) || null;
}

export function updateTask(id, fields = {}) {
  const tasks = readTasks();
  const t = tasks.find((t) => t.id === id) || null;
  if (!t) return null;
  Object.assign(t, fields);
  t.updatedAt = new Date().toISOString();
  writeTasks(tasks);
  return t;
}

export function deleteTask(id) {
  const tasks = readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const [removed] = tasks.splice(idx, 1);
  writeTasks(tasks);

  return removed;
}

export function deleteAllTask() {
  writeTasks([]);
  return true;
}
