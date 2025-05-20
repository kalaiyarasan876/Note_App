const express = require("express");
require("dotenv").config();
// const db = require("./db");
var cookieParser = require('cookie-parser')
const app = express();
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");

//middleware
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
