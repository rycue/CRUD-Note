const htmlTextField = document.getElementById("textField");
htmlTextField.focus();
htmlTextField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addNote();
});

function deleteNote(noteID) {
    fetch(`/notes/${noteID}`, {
        method: "DELETE"
    })
    .then(() => displayNotes())
    .catch(error => console.error("Error deleting note:", error));
}

function editNote(note) {
    const newText = prompt("Edit the note", note.text);
    if (newText && newText.trim() && newText != note.text) {
        fetch(`/notes/${note.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newText })
        })
        .then(response => response.json())
        .then(() => {
            displayNotes();
        })
        .catch(error => console.error("Error editing note:", error));
    }   
}

function addNote() {
    const text = document.getElementById("textField").value.trim();
    if (text) {
        fetch("/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({text})
        })
        .then(response => response.json())
        .then(() => {
            document.getElementById("textField").value = "";
            // refetch
            displayNotes();
        })
        .catch(error => console.error("Error adding note:", error));
    }
}

function displayNotes() {
    fetch("/notes")
    .then(response => response.json())
    .then((data) => {
        const htmlNoteList = document.getElementById("notes"); // <ol>
        htmlNoteList.innerHTML = ""; // clear
        data.forEach(note => {
            const li = document.createElement("li"); // <li>
            li.textContent = note.text;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteNote(note.id));
            
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editNote(note));
            
            li.append(editBtn, deleteBtn);
            htmlNoteList.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching notes:", error ));
}

const htmlAddBtn = document.getElementById("addBtn");
htmlAddBtn.addEventListener("click", addNote);

/**============================================
 *                FUNCTION CALLS
 *=============================================**/
displayNotes();