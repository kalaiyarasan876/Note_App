const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const register = async (req, res) => {

    try {

        const { username, password, email, contact } = req.body;
        // console.log(username, password, email, contact);

        const profile_image = req.file ? `/uploads/${req.file.filename}` : null

        if (!username || !password || !email || !contact) {
            return res.status(400).json({ message: "All Field is Required" })
        }

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            return res.status(400).json({ message: "Only valid Gmail addresses are allowed" });
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(contact)) {
            return res.status(400).json({ message: "Phone number must be 10 digits" });
        }

        const [existingUser] = await db.query("SELECT * FROM users where username=? or email=?", [username, email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User Already Existed" })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const [newUser] = await db.query("INSERT INTO users (username, email, contact,password, profile_image) VALUES (?,?,?,?,?)", [username, email, contact, hashPassword, profile_image]);

        res.status(200).json({ message: "User Registration Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }

};




const login = async (req, res) => {

    try {

        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "All Field is Required" })
        }

        const [user] = await db.query('SELECT * FROM users WHERE username=? or email=?', [username, username]);

        //console.log(user[0]);

        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid Username or Password" })
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        // console.log(isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" })
        }

        //Generated JWT Token
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
        //console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
        })

        res.status(200).json({ message: "Login Successfully", user: user[0] })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}



const getCurrentUser = async (req, res) => {

    try {

        const userId = req.user.id;

        // console.log  (userId);

        const [user] = await db.query("SELECT * FROM users WHERE id=?", [userId]);

        if (user.length === 0) {
            return res.status(400).json({ message: "User Not Found" })
        }

        res.status(200).json(user[0])

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })

    }
}



const uploadProfileImage = async (req, res) => {
    
    try {
        const userId = req.user.id;
        const profile_image = req.file ? `uploads/${req.file.filename}` : null
        

        const [result] = await db.query("UPDATE users set profile_image=? WHERE id=?", [profile_image, userId]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "User Not Found" })
        }

        res.status(200).json({ message: "Profile Image Updated Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}



const logout = async(req, res)=>{
    try {
        res.clearCookies("token")
        res.status(200).json({message:"Logout Successfully"})
        
    } catch (error) {
         res.status(500).json({ message: "Server Error", error: error.message })
    }
}


module.exports = { register, login, getCurrentUser, uploadProfileImage, logout };