const express = require("express");
require("dotenv").config();
// const db = require("./db");
var cookieParser = require('cookie-parser')
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const app = express();
const cors = require("cors");
const path = require('path');


app.use('/uploads', express.static(path.join(__dirname, './uploads')));


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true  // Allow credentials (cookies, authorization headers, etc.)
}));

app.get('/', (req, res) => {
  res.send('Welcome to my Note App!');
});

app.use(express.json())

//middleware
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})
