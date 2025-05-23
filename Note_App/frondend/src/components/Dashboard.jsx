import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  //  console.log(createNote);
  // console.log(updateNoteId);
  // console.log(editingNoteId);





  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/notes", {
        withCredentials: true
      });
      setNotes(response.data);
      //console.log(response);

    } catch (error) {
      setError(error.response.data.error || "Failed to fetch notes");
    }

  }

  useEffect(() => {
    fetchNotes();
  }, [])


  const handleInsertUpdateNote = async () => {

    try {

      if (editingNoteId) {
        //update
        await axios.put(`http://localhost:8000/api/notes/${editingNoteId}`, { note }, { withCredentials: true })
        setEditingNoteId(null)
      } else {
        //Insert
        const res = await axios.post("http://localhost:8000/api/notes/createNotes", { note }, { withCredentials: true });
        //console.log(res);
        setNote(res.data)
      }
      setNote("");
      fetchNotes();
    } catch (error) {
      setTimeout(() => {
        setError(error?.response?.data?.error || "Failed to create note");
        setTimeout(() => {
          setError("");
        }, 3000);
      }, 1000);

    }
  }




  // const handleEditNote = (note) => {
  //   setCreateNote(note.note);
  //   setUpdateNoteId(note.note_id);
  // };

  const handleEditNote = (note) => {
    setNote(note.note);
    setEditingNoteId(note.note_id)
  }



  const handleDeleteNote = async (id) => {
    try {
      if (confirm("Are you Sure delete?")) {
        await axios.delete(`http://localhost:8000/api/notes/${id}`, { withCredentials: true })
      }
      fetchNotes();
    } catch (error) {
      setError(error?.response?.data?.error || "Failed to delete note");
    }
  }



  return (
    <>
      <div className="dashboard-container">

        <div className="dashboard-card">
          {error && <p className="error">{error}</p>}
          <div className="dashboard-title">
            <h1>Dashboard</h1>
          </div>
          <div className="note-input">
            <textarea className="input-textarea" value={note} onChange={(e) => setNote(e.target.value)} ></textarea>
            <button className='button' onClick={handleInsertUpdateNote}>{editingNoteId ? "Update Note" : "Insert Note"}</button>
          </div>
        </div>
        <div>

          {notes.map((note) => (
            <div className="dashboard-notes" key={note.note_id}>
              <div className="note-card">
                <h3>{note.note}</h3>
                <p>{note.date}</p>
                <div className="note-buttons">
                  <button className='edit-button' onClick={() => handleEditNote(note)} >Edit</button>
                  <button className='delete-button' onClick={() => handleDeleteNote(note.note_id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

    </>
  )
}

export default Dashboard;