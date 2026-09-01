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


const upload = multer({
    storage,
});

export default upload;
