const dotenv = require("dotenv");

const result = dotenv.config();

console.log(result);

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const path = require("path");
const authRoutes=require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth",authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {

    res.send("🚀 StreVo Backend Running");

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});