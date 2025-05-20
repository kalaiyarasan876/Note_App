const multer = require("multer");
const path = require('path');
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, uploadDir)
    },

    filename:(req, file, cb)=>{
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
})


const upload = multer({
    storage,
    fileFilter:(req, file, cb)=>{
        const fileType=/jpeg|png|jpg/;
        const extname = fileType.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileType.test(file.mimetype)
        if(extname && mimeType){
            return cb(null, true)
        }
        cb(new Error("Only images (JPEG, PNG, JPG) are allowed"))
    },
    limits:{fileSize:5*1024*1024}
})

module.exports = {upload}

