const jwt = require("jsonwebtoken")


const auth = (req, res, next) => {
    
    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
}


module.exports = auth;