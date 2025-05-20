const db = require("../db");


const createNotes = async (req, res) => {
    
    try {
        const { notes } = req.body;
        const userId = req.user.id;
        if (!notes) {
            return res.status(400).json({ message: "All Field is Required" })
        }
        const date = new Date().toISOString().split("T")[0];
        const [result] = await db.query("INSERT INTO notes (note, user_id, date) VALUES (?, ?, ?)", [notes, userId, date]);

        res.status(200).json({ message: "Notes Created Successfully", result: result })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}


const getNotes = async (req, res) => {
    try {
        const userId = req.user.id;

        const [result] = await db.query("SELECT * FROM notes WHERE user_id = ?", [userId]);

        res.status(200).json({ message: "Notes Fetched Successfully", result: result });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })

    }
}



const updateNotes = async (req, res) => {

    try {
        const { notes } = req.body;
        const userId = req.user.id;
        const noteId = req.params.noteId;

        //console.log(noteId, userId, notes);


        if (!notes) {
            return res.status(400).json({ message: "All Field is Required" })
        }

        const [result] = await db.query("UPDATE notes SET note = ? WHERE note_id = ? and user_id = ?", [notes, noteId, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        res.status(200).json({ message: "Notes Updated Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}



const deleteNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.noteId;
      //  console.log(userId, noteId);
        
        await db.query("DELETE FROM notes WHERE note_id = ? and user_id = ?", [userId, noteId]);
        res.status(200).json({ message: "Notes Deleted Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
module.exports = { createNotes, getNotes, updateNotes, deleteNotes };