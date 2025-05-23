const db = require("../db");


const createNotes = async (req, res) => {
    try {
        const { note } = req.body;
        const userId = req.user.id;
        if (!note) {
            return res.status(400).json({ message: "Note content is required" });
        }
        const date = new Date().toISOString().split("T")[0];
        const [result] = await db.query("INSERT INTO notes (user_id, note , date) VALUES (?, ?, ?)", [userId, note, date]);

        res.status(200).json({ message: "Notes Created Successfully", result: result })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}



const getNotes = async (req, res) => {
    try {
        const user = req.user;

        if (!user && !user.id) {
            return res.status(400).json({ message: "User not found" })
        }

        const [result] = await db.query("SELECT * FROM notes WHERE user_id = ?", [user.id]);

        // res.status(200).json({ message: "Notes Fetched Successfully"});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })

    }
}



const updateNotes = async (req, res) => {

    try {
        const { note } = req.body;
        const userId = req.user.id;
        const noteId = req.params.noteId;

        //console.log(noteId, userId, notes);


        if (!note) {
            return res.status(400).json({ message: "All Field is Required" })
        }

        const [result] = await db.query("UPDATE notes SET note = ? WHERE note_id = ? and user_id = ?", [note, noteId, userId]);

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

        const [result] = await db.query("DELETE FROM notes WHERE note_id = ? and user_id = ?", [noteId, userId]);
        res.status(200).json({ message: "Notes Deleted Successfully", result })



        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message, })
    }
}
module.exports = { createNotes, getNotes, updateNotes, deleteNotes };