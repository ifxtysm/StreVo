const db = require("../config/db");

exports.uploadVideo = (req, res) => {

    try {

        const { title, description, category } = req.body;

        if (!req.files || !req.files.video || !req.files.thumbnail) {

            return res.status(400).json({
                message: "Video and Thumbnail are required"
            });

        }

        const video = req.files.video[0].filename;

        const thumbnail = req.files.thumbnail[0].filename;

        const userId = req.user.id;

        const sql = `
            INSERT INTO videos
            (title, description, category, video_url, thumbnail_url, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                title,
                description,
                category,
                video,
                thumbnail,
                userId
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    message: "Video Uploaded Successfully"
                });

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

};
exports.getAllVideos = (req, res) => {

    const sql = `
        SELECT
            videos.*,
            users.username
        FROM videos
        JOIN users
        ON videos.user_id = users.id
        ORDER BY videos.created_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });

};
exports.getVideoById = (req, res) => {

    const id = req.params.id;

    const updateViews = `
        UPDATE videos
        SET views = views + 1
        WHERE id = ?
    `;

    db.query(updateViews, [id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        const sql = `
            SELECT
                videos.*,
                users.username
            FROM videos
            JOIN users
            ON videos.user_id = users.id
            WHERE videos.id = ?
        `;

        db.query(sql, [id], (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.status(404).json({
                    message: "Video not found"
                });

            }

            res.status(200).json(result[0]);

        });

    });

};