import express from 'express';
import Database from 'better-sqlite3';

// SERVER SETUP
const app = express();
const port = process.env.PORT || 3000;

// DATABASE SETUP
const db = new Database("database.db");
db.prepare(
    `CREATE TABLE IF NOT EXISTS notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL
    )`
).run();

/**============================================
 *                 MIDDLEWARES
 *=============================================**/
app.use(express.static("public"));
app.use(express.json());

/**============================================
 *                   ROUTES
 *=============================================**/

// Route: GET > Home
app.get("/", (req, res) => {
    res.sendFile("public/index.html");
});

// Route: GET > Fetch all notes
app.get("/notes", (req, res) => {
    const rows = db.prepare("SELECT * FROM notes").all();
    res.json(rows);
});

// Route: POST > Create a new note
app.post("/notes", (req, res) => {
    const { text } = req.body;
    const stmt = db.prepare("INSERT INTO notes (text) VALUES (?)");
    const info = stmt.run(text);
    res.status(201).json({ id: info.lastInsertRowid, text });
});

// Route: DELETE > Delete a note by ID
app.delete("/notes/:id", (req, res) => {
    const { id } = req.params;
    if (Number.isNaN(id))
        return res.status(400).json({ error: "Invalid ID" });
    const stmt = db.prepare("DELETE FROM notes WHERE id = ?");
    const info = stmt.run(id);
    if (info.changes === 0)
        return res.status(404).json({ error: "Note not found" });
    res.sendStatus(204);
});

// Route: PUT > Update a note by ID
app.put("/notes/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if (Number.isNaN(id))
        return res.status(400).json({ error: "Invalid ID" });
    if (!text || text.trim() === "")
        return res.status(400).json({ error: "Invalid text" });
    const stmt = db.prepare("UPDATE notes SET text = ? WHERE id = ?").run(text, id);
    if (stmt.changes === 0)
        return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note updated successfully" });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});