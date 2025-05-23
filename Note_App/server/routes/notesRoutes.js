const express = require("express");
const { createNotes, getNotes, updateNotes, deleteNotes } = require("../controllers/notesController");
const auth = require("../middleware/auth");
const routes = express.Router();

routes.post("/createNotes", auth, createNotes);
routes.get("/", auth, getNotes);
routes.put("/:noteId", auth, updateNotes);
routes.delete("/:noteId", auth, deleteNotes);

module.exports = routes;


