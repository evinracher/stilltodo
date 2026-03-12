# ✅ Stilltodo — Task Management for Developers

A simple CLI tool that lets you handle your pending tasks like a real programmer, directly from the terminal. You don’t have to leave it anymore — your endless todo list stays in your work environment so you can keep working, day after day, until burnout feels inevitable.

## 🧠 What is this?

**Stilltodo** is a lightweight command-line application built with **Node.js** for developers who spend most of their day in the terminal and want to manage tasks without leaving it.


## 🌍 Installation

### Install globally from npm

```bash
npm install -g stilltodo
```

Then use it anywhere with:

```bash
todo --help
```

## ▶️ Usage

The CLI is exposed through the `todo` command.

### Add a new task (default command)

```bash
todo "Refactor legacy service"
```

### Get all tasks

```bash
todo all
```

### Complete a task by its number

```bash
todo complete 3
```

### Remove completed tasks

```bash
todo clear
```

👉 You can see the full list of commands and options at any time by running:

```bash
todo --help
```


## 📋 Available Commands

```bash
todo <description>      add a new task (default)
todo all                get all tasks
todo complete <number>  complete task n° <number>
todo clear              remove completed tasks
```


## ✨ Features

- 🖥️ Manage tasks directly from the terminal
- ⚡ Default command for quickly adding new tasks
- 🔢 Simple numeric task completion
- 📂 File-based persistence
- 🧪 Basic unit tests
- 📦 Modern ES Modules setup


## 🛠️ Tech Stack & Key Packages

### Runtime
- **Node.js** (ES Modules enabled)

### Main Packages
- 📌 **yargs** — CLI command parsing and argument handling
- 🧪 **jest** — Unit testing framework

### Native Modules
- 📁 `fs` — File system access for task persistence


## Development

## 🔗 Install the CLI locally

To make the `todo` command available globally during development:

```bash
npm link
```


## 🧪 Testing

This project includes **basic unit tests** using **Jest**, configured to work with **Node.js ES Modules**.

Run tests with:

```bash
npm test
```


## 🧩 Pending Work / Roadmap

- 🗄️ Add database integration (replace file-based storage)
- 🧪 Complete and expand the test suite
- Add due date to the tasks (today, for the end of the week, for the end of the month)

-t: today (default)
-w: this week
-m: this month
-y: this year
-s: someday

## 🎯 Intended Audience

This project is intended for **developers**, especially those who live in the terminal and prefer simple tools over heavy productivity systems.


## 👤 Author

**Kevin Parra**  
Senior Frontend Engineer | JavaScript • React • Node.js  

🔗 LinkedIn: https://www.linkedin.com/in/evinracher/
