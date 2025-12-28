# Notes App

A simple, full-stack notes application built with Node.js, Express, TypeScript, and SQLite. Features a minimal, responsive frontend with CRUD operations.

## Features

- ✅ (C)reate a note
- ✅ (R)ead/display a note
- ✅ (U)pdate/edit a note
- ✅ (D)elete a note

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, better-sqlite3
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Database**: SQLite

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd webapp2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Usage

- **Add Note**: Type in the input field and click "Add" or press Enter
- **Edit Note**: Click the "Edit" button, modify in the prompt, save
- **Delete Note**: Click the "Delete" button


## Project Structure

```
webapp2/
├── server.ts          # Express server
├── package.json       # Dependencies and scripts
├── public/
│   ├── index.html     # Main HTML
│   ├── app.js         # Frontend JavaScript
│   └── style.css      # Styles
├── database.db        # SQLite database (auto-created)
└── README.md          # This file
```

---

<center><i>Built as a learning project for Node.js and Express. 🚀</i></center>