const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/auth");

const commentController = require("../controllers/commentController");

router.post(
    "/",
    authenticateToken,
    commentController.addComment
);

router.get(
    "/:videoId",
    commentController.getComments
);

module.exports = router;