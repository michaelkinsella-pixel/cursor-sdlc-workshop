# Product Requirements Document (PRD)

> **Instructions:** This is your project specification. Fill in the sections below to define what you're building.

---

## Project Overview

**Project Name:** Plot — Garden Tracker

**One-line Description:** A single-page web app to remind the user what they need to do on a monthly/weekly basis to manager the plants in the garden.

**Type:** Web App (React, single screen)

---

## Guidelines

### Keep It Small!

- Your MVP should be buildable in **10 minutes**
- Think "proof of concept" not "production ready"
- If it sounds ambitious, make it simpler
- **Use Cursor to help you plan this!**
- This exercise is about learning the git flow and understanding where Cursor's features fit into the SDLC

### Good Project Ideas

**Pong** — classic paddle-and-ball game

- *Example features:* scoreboard, sound effects, difficulty/speed settings

**Memory Card Match** — flip cards to find matching pairs

- *Example features:* move counter, timer, win animation/confetti

**Drawing Pad** — simple canvas you can sketch on

- *Example features:* color picker, brush size slider, eraser tool

**Typing Speed Game** — type a passage and measure your words per minute

- *Example features:* WPM display, accuracy tracker, difficulty levels

**Trivia Quiz** — multiple choice questions with score tracking

- *Example features:* timer per question, category selector, results summary screen

### Bad Project Ideas (Too Big!)

- Anything with a database — tell Cursor to avoid this
- Anything requiring authentication
- Anything with multiple pages/screens
- Anything that "needs" an API

---

## Base MVP

> Build the minimal working version of your project first.

**What the MVP includes:**

- One page showing a **list of plants** (each row/card: name + optional short note, e.g. “herb bed” or “full sun”).
- **Add plant** — simple form: plant name (required), optional note; submit adds it to the list.
- **Remove plant** — button per row to delete from the list.
- All data lives in **React state only** (resets on refresh) so there’s no server, auth, or database.

**What it does NOT include (stretch goals):**

- User accounts, login, or cloud sync
- Separate routes or multiple screens
- Weather API, plant ID API, or image uploads
- A real database (Postgres, Firebase, etc.)

---

## Features

> Plan out the features you want to add after the MVP is working. Each feature should be in its own component file to keep things organized.

### Feature 1: Last watered

- **Description:** Each plant shows a “Last watered” date (or “Mark watered today” button) so you can track care at a glance.
- **Files to create:** e.g. `PlantRow.jsx` (or extend existing row component), optional `wateringUtils.js` for date formatting.

### Feature 2: Filter / search

- **Description:** Text filter to show only plants whose name or note matches what you type.
- **Files to create:** e.g. `PlantFilter.jsx`

### Feature 3: Persist with localStorage

- **Description:** Save the plant list in `localStorage` so a browser refresh doesn’t clear the garden (still no server—acceptable for this workshop).
- **Files to create:** e.g. `useGardenStorage.js` (custom hook) or `gardenStorage.js`

---

## Success Criteria

- MVP runs locally
- At least one PR merged to the original repo
- Features work without breaking the base app

