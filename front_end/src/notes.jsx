import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("https://note-taking-app-kz5a.onrender.com/api/notes/")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  async function deleteNote(id) {
    await fetch(
      `https://note-taking-app-kz5a.onrender.com/api/notes/${id}/`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.ok) {
        setNotes(notes.filter((note) => note.id !== id));
      }
    });
  }

  async function addNote() {
    const newNote = {
      title: title,
      content: content,
    };

    const response = await fetch(
      "https://note-taking-app-kz5a.onrender.com/api/notes/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      }
    );

    const savedNote = await response.json();

    setNotes([...notes, savedNote]);

    setTitle("");
    setContent("");
  }

  function editNote(id) {
    setEditingId(id);
  }

  async function updateNote(note) {
    await fetch(
      `https://note-taking-app-kz5a.onrender.com/api/notes/${note.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }
    );

    setEditingId(null);
  }

  return (
    <div className="app">
      <h1>My Notes</h1>

      <div className="container">

        {/* Notes section */}
        <section className="notes-section">
          <h2>Your Notes</h2>

          {notes.map((note, index) => (
            <div className="note" key={index}>

              {editingId === note.id ? (
                <input
                  value={note.title}
                  onChange={(e) => {
                    setNotes(
                      notes.map((n) =>
                        n.id === note.id
                          ? { ...n, title: e.target.value }
                          : n
                      )
                    );
                  }}
                />
              ) : (
                <h3>{note.title}</h3>
              )}

              {editingId === note.id ? (
                <div>
                  <textarea
                    value={note.content}
                    onChange={(e) => {
                      setNotes(
                        notes.map((n) =>
                          n.id === note.id
                            ? { ...n, content: e.target.value }
                            : n
                        )
                      );
                    }}
                  />

                  <button onClick={() => updateNote(note)}>
                    Save
                  </button>
                </div>
              ) : (
                <p>{note.content}</p>
              )}

              <button onClick={() => editNote(note.id)}>
                Edit
              </button>

              <button onClick={() => deleteNote(note.id)}>
                Delete
              </button>

            </div>
          ))}
        </section>

        {/* Add note section */}
        <section className="add-section">
          <h2>Add New Note</h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={addNote}>
            Add Note
          </button>
        </section>

      </div>
    </div>
  );
}

export default App;
