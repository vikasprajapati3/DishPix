import multer from "multer";
import fs from "fs";
import path from "path";


const storage = multer.diskStorage({
    destination: "uploads/",

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);

        let filename = file.originalname;
        let count = 1;

        while (fs.existsSync(path.join("uploads", filename))) {
            filename = `${name}(${count})${ext}`;
            count++;
        }

        cb(null, filename);
    }
});


// Type filter function 
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed!"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
        files: 1,
    },
});

export default upload;
