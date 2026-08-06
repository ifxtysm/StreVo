const multer = require("multer");
const path = require("path");
const fs = require("fs");

const videoDir = path.join(__dirname, "../uploads/videos");
const thumbnailDir = path.join(__dirname, "../uploads/thumbnails");

// Create folders if they don't exist
if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
}

if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "video") {
            cb(null, videoDir);
        } else if (file.fieldname === "thumbnail") {
            cb(null, thumbnailDir);
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

module.exports = multer({
    storage,
    fileFilter
});