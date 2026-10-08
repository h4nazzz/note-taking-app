import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [notes, setNotes] = useState([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access");

    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      setNotes([]);
      return;
    }

    fetch("https://note-taking-app-kz5a.onrender.com/api/notes/", {
      headers: getAuthHeaders(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        return response.json();
      })
      .then((data) => {
        setNotes(data);
      })
      .catch(() => {
        setNotes([]);
      });
  }, []);

  async function deleteNote(id) {
    const response = await fetch(
      `https://note-taking-app-kz5a.onrender.com/api/notes/${id}/`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      }
    );

    if (response.ok) {
      setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
    }
  }

  async function addNote() {
    if (!title.trim() || !content.trim()) {
      return;
    }

    const newNote = {
      title,
      content,
    };

    const response = await fetch(
      "https://note-taking-app-kz5a.onrender.com/api/notes/",
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newNote),
      }
    );

    if (!response.ok) {
      return;
    }

    const savedNote = await response.json();

    setNotes((currentNotes) => [...currentNotes, savedNote]);
    setTitle("");
    setContent("");
  }

  function editNote(id) {
    setEditingId(id);
  }

  async function updateNote(note) {
    const response = await fetch(
      `https://note-taking-app-kz5a.onrender.com/api/notes/${note.id}/`,
      {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(note),
      }
    );

    if (response.ok) {
      setEditingId(null);
    }
  }

  return (
    <div className="app">
      <h1>My Notes</h1>

      <div className="container">
        <section className="notes-section">
          <h2>Your Notes</h2>

          {notes.map((note, index) => (
            <div className="note" key={note.id ?? index}>
              {editingId === note.id ? (
                <input
                  value={note.title}
                  onChange={(e) => {
                    setNotes((currentNotes) =>
                      currentNotes.map((n) =>
                        n.id === note.id ? { ...n, title: e.target.value } : n
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
                      setNotes((currentNotes) =>
                        currentNotes.map((n) =>
                          n.id === note.id ? { ...n, content: e.target.value } : n
                        )
                      );
                    }}
                  />

                  <button onClick={() => updateNote(note)}>Save</button>
                </div>
              ) : (
                <p>{note.content}</p>
              )}

              <button onClick={() => editNote(note.id)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </section>

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

          <button onClick={addNote}>Add Note</button>
        </section>
      </div>
    </div>
  );
}

export default App;
