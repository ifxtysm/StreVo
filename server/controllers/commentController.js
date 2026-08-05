const db = require("../config/db");

exports.addComment = (req, res) => {

    const { comment, video_id } = req.body;

    const user_id = req.user.id;

    const sql = `
        INSERT INTO comments
        (comment, user_id, video_id)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            comment,
            user_id,
            video_id
        ],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Comment Added"
            });

        }
    );

};

exports.getComments = (req, res) => {

    const { videoId } = req.params;

    const sql = `
        SELECT
            comments.*,
            users.username
        FROM comments
        JOIN users
        ON comments.user_id = users.id
        WHERE video_id = ?
        ORDER BY comments.created_at DESC
    `;

    db.query(
        sql,
        [videoId],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json(result);

        }
    );

};