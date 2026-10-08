import { useState,useEffect} from "react";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [notes, setNotes] = useState([]);

useEffect(() => {
    fetch("http://127.0.0.1:8000/api/notes/")
        .then(response => response.json())
        .then(data => {
            setNotes(data);
        });
}, []);

async function deleteNote(id) {
   await fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
        method: "DELETE",
    })
        .then(response => {
            if (response.ok) {
                setNotes(notes.filter(note => note.id !== id));
            }
        });
}
  async function addNote() {
  const newNote = {
    title: title,
    content: content,
  };

  const response = await fetch("http://127.0.0.1:8000/api/notes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });

  const savedNote = await response.json();

  setNotes([...notes, savedNote]);

  setTitle("");
  setContent("");
}

function editNote(id) {
setEditingId(id);
}

async function updateNote(note) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/notes/${note.id}/`,
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
    <div>
      <h1>My Notes</h1>

      <div>
        {/* Notes section */}
        <section>
          <h2>Your Notes</h2>

          {notes.map((note, index) => (
            <div key={index}>
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
              {editingId === note.id ? (<div><button onClick={() => updateNote(note)}>Save</button>
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
/></div>
) : (
  <p>{note.content}</p>
)}
              <button onClick={() => editNote(note.id)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </section>

        {/* Add note section */}
        <section>
          <h2>Add New Note</h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <br />

          <button onClick={addNote}>Add Note</button>
        </section>
      </div>
    </div>
  );
}

export default App;