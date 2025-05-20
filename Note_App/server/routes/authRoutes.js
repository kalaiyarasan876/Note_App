const express = require("express");
const { register, login, getCurrentUser, uploadProfileImage } = require("../controllers/authController");
const { upload } = require("../middleware/fileUpload");
const auth = require("../middleware/auth");
const routes = express.Router();

routes.post("/register", upload.single("profile_image"), register);
routes.post("/login", login);
routes.get("/me", auth, getCurrentUser);
routes.post("/upload-profile-image", auth, upload.single("profile_image"), uploadProfileImage);

module.exports = routes;