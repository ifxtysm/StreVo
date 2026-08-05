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

exports.getTrendingVideos = (req, res) => {

    const sql = `
        SELECT
            videos.*,
            users.username
        FROM videos
        JOIN users
        ON videos.user_id = users.id
        ORDER BY videos.views DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });

};

exports.getSubscriptions = (req,res)=>{

    const userId=req.user.id;

    const sql=`
    SELECT
        videos.*,
        users.username
    FROM videos

    JOIN subscriptions
    ON subscriptions.creator_id=videos.user_id

    JOIN users
    ON users.id=videos.user_id

    WHERE subscriptions.subscriber_id=?

    ORDER BY videos.created_at DESC
    `;

    db.query(sql,[userId],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

exports.getRelatedVideos = (req, res) => {

    const { videoId } = req.params;

    const sql = `
        SELECT
            videos.*,
            users.username
        FROM videos
        JOIN users
        ON videos.user_id = users.id
        WHERE videos.id != ?
        ORDER BY RAND()
        LIMIT 6
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

exports.incrementViews = (req, res) => {

    const id = req.params.id;

    db.query(
        "UPDATE videos SET views = views + 1 WHERE id=?",
        [id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Views Updated"
            });

        }
    );

};

const fs = require("fs");
const path = require("path");

exports.deleteVideo = (req, res) => {

    const videoId = req.params.id;

    const userId = req.user.id;

    const sql = `
        SELECT *
        FROM videos
        WHERE id = ?
    `;

    db.query(sql, [videoId], (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.length === 0) {

            return res.status(404).json({

                message: "Video not found"

            });

        }

        const video = result[0];

        if (video.user_id !== userId) {

            return res.status(403).json({

                message: "You can delete only your own videos"

            });

        }

        const videoPath = path.join(
            __dirname,
            "../uploads/videos",
            video.video_url
        );

        const thumbnailPath = path.join(
            __dirname,
            "../uploads/thumbnails",
            video.thumbnail_url
        );

        if (fs.existsSync(videoPath)) {

            fs.unlinkSync(videoPath);

        }

        if (fs.existsSync(thumbnailPath)) {

            fs.unlinkSync(thumbnailPath);

        }

        db.query(

            "DELETE FROM videos WHERE id=?",

            [videoId],

            (err) => {

                if (err)
                    return res.status(500).json(err);

                res.json({

                    message: "Video deleted successfully"

                });

            }

        );

    });

};