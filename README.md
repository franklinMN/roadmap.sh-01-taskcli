# Task Tracker CLI

A simple Command Line Interface (CLI) tool to track your tasks with features like adding, listing, marking status, and more.  
This project is based on the challenge from [roadmap.sh](https://roadmap.sh/projects/task-tracker).

---

## Features
- Add new tasks
- List all tasks or filter by status
- Update task status (done, in-progress, todo)
- Edit task details
- Delete tasks
- Persistent storage in a JSON file

---

## Requirements
- [Node.js](https://nodejs.org/) (v14 or later)
- npm (comes with Node.js)

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
```
2. **Install dependencies**
```bash
npm install
```
3. **Make the CLI executable (optional, for global use)**
```bash
npm link
```

# Usage
## Run commands using:
```bash
node index.js <command> [options]
# or if linked globally
task <command> [options]
```

## Commands
```bash
task add "Task description here"
task get <id>
task list
task list done
task list in-progress
task list todo
tash list notdone
task mark <id> done
task mark <id> in-progress
task mark <id> todo
task update <id> <description>
task delete <id>
tash deleteAll
```

## Examples
```bash
task add "Finish writing README"
task list
task mark 1234 done
```

## Reference
This project was inspired by the Task Tracker Project on roadmap.sh.

---
If you want, I can also **add a "Development Notes" section** so future you knows exactly where files like `tasks.json` are stored and which commands you used during development. That will make it easier to revisit later.
