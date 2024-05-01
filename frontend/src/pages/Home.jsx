import React, { useState, useEffect } from 'react'
import api from "../api"
import Note from '../components/Note';
import '../styles/Home.css'


function Home() {

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => { setNotes(data); console.log(data) })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`).then((res) => {
        if (res.status == 204) alert("Note deleted!")
        else alert("Failed to delete note.")
      getNotes();
      }).catch((err) => alert(err))
  }

  const CreateNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) alert("Note created!")
        else alert("Failed to create note.")
        getNotes();
      }).catch((err) => alert(err))
      setTitle("");
      setContent("");
  };

  return (
    <>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>

      <h2>Create a Note</h2>
      <form onSubmit={CreateNote}>
        <label htmlFor='title'>Title</label>
        <br />
        <input
          type='text'
          id='title'
          name='title'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor='content'>Content</label>
        <br />
        <textarea
          id='content'
          name='content'
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type='submit' value={"Submit"}></input>
      </form>
    </>
  )
}

export default Home