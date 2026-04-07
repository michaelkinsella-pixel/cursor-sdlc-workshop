---
name: project-creation
description: Creates and repairs SDLC workshop participant project folders under `projects/<github-username>/` by copying `projects/project_template/` safely (no overwrites). Ensures `base_mvp/.gitignore` exists so `node_modules` and build artifacts are not committed. When to use: when the user asks to create their project folder, set up their workshop project, or when `projects/<username>/` is missing/empty/incomplete.
---

# Project Creation (SDLC Workshop)

## When to use

Activate whenever the user asks to:
- create a project folder under `projects/`
- set up their workshop project folder
- “my project folder isn’t working” / missing workshop files (`prd.md`, etc.)

## Source of truth

- Follow `projects/README.md` (this repo) for the expected workshop folder shape.
- **Active** participant work lives at `projects/<github-username>/` (created from `projects/project_template/`). **Retired** workshop trees are kept under `archive/projects/<github-username>/` (repo root `archive/`, not under `projects/`). Do not copy from `archive/projects/` as a template—always use `project_template/`.

## Create or repair `projects/<github-username>/` (template-driven)

### 1) Determine GitHub username (do not guess)

- **Preferred**: use GitHub CLI as the source of truth:
  - `gh api user --jq .login`
- If that fails or returns empty:
  - instruct the user to run `gh auth login`, or ask them for their GitHub username explicitly
- Do **not** infer from `git remote` (it may be an org repo).

### 2) Create / repair the folder (do not overwrite work)

**Goal**: ensure `projects/<github-username>/` contains the template files from `projects/project_template/`.

- If `projects/<github-username>/` does **not** exist:
  - create it, then copy the template contents into it
- If `projects/<github-username>/` **exists but is empty** (common failure mode):
  - copy the template contents into it
- If `projects/<github-username>/` **exists and has files**:
  - **do not overwrite participant work**
  - copy **missing** template files only

**Command patterns (safe defaults):**

- Create folder:
  - `mkdir -p "projects/<github-username>"`
- Copy template contents (overwrites if same paths exist; only use when safe):
  - `cp -R "projects/project_template/." "projects/<github-username>/"`
- Copy **missing only** (preferred when folder already has files):
  - `cp -Rn "projects/project_template/." "projects/<github-username>/"`

### 3) Verification (required)

After copying, confirm the template actually landed:

- `test -f "projects/<github-username>/prd.md"`
- `test -f "projects/<github-username>/github_command_cheatsheet.md"`
- `test -f "projects/<github-username>/base_mvp/README.md"`
- `test -f "projects/<github-username>/base_mvp/.gitignore"`

If any check fails, treat it as **not done** and repair by copying again (or copying missing files).

### 3b) `.gitignore` and dependency folders (required for new / scaffolded apps)

**Goal**: `node_modules`, build output, caches, and secrets never get committed.

- The template includes `base_mvp/.gitignore` with common Node/Vite ignores (`node_modules`, `dist`, logs, editor junk). **Do not skip copying it.**
- If the participant (or you) runs `npm create vite@latest`, `npm install`, or similar **inside** `base_mvp/`:
  - Ensure a `.gitignore` exists there (copy from `projects/project_template/base_mvp/.gitignore` if missing).
  - If the tool generated its own `.gitignore`, keep it—verify it includes at least `node_modules/` and typical build dirs (`dist`, `.vite`, etc.).
- The repo root `.gitignore` also ignores `**/node_modules/` workshop-wide; participant-level `.gitignore` is still required so local `git status` stays clean and tools behave predictably.
- After `npm install`, run `git status` from the repo root: `node_modules` (and similar) should be ignored, not listed as untracked files to add. Never `git add` under `node_modules/`.

### 4) Safety / idempotency rules

- Never delete or overwrite participant work.
- If you created the wrong folder:
  - only remove it if it is **empty**
  - otherwise leave it and create the correct one

