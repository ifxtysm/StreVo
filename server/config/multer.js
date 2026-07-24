const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "video") {
            cb(null, path.join(__dirname, "../uploads/videos"));
        } else if (file.fieldname === "thumbnail") {
            cb(null, path.join(__dirname, "../uploads/thumbnails"));
        }
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "video") {
        const allowed = /\.(mp4|mov|avi|mkv)$/i;
        return allowed.test(file.originalname)
            ? cb(null, true)
            : cb(new Error("Only video files are allowed"));
    }

    if (file.fieldname === "thumbnail") {
        const allowed = /\.(jpg|jpeg|png|webp)$/i;
        return allowed.test(file.originalname)
            ? cb(null, true)
            : cb(new Error("Only image files are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;