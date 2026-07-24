const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/auth");

const upload = require("../config/multer");

const videoController = require("../controllers/videoController");

router.post(

    "/upload",

    authenticateToken,

    upload.fields([
        {
            name: "video",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),

    

    videoController.uploadVideo

);
router.get(
    "/",
    videoController.getAllVideos
);

router.get(
    "/:id",
    videoController.getVideoById
);
module.exports = router;