const express = require("express");
const { createNotes, getNotes, updateNotes, deleteNotes } = require("../controllers/notesController");
const auth = require("../middleware/auth");
const routes = express.Router();

routes.post("/createNotes", auth, createNotes);
routes.get("/getNotes/:userId", auth, getNotes);
routes.put("/updateNotes/:noteId", auth, updateNotes);
routes.delete("/deleteNotes/:noteId", auth, deleteNotes);

module.exports = routes;


