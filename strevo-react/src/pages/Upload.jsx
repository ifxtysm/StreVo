import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/style.css";
import "../styles/upload.css";

function Upload() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    async function uploadVideo(e) {

        e.preventDefault();

        if (!thumbnail || !video) {

            alert("Please select both thumbnail and video.");

            return;

        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("thumbnail", thumbnail);
        formData.append("video", video);

        setLoading(true);

        try {

            await axios.post(
                "http://localhost:3000/api/videos/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Video uploaded successfully!");

            navigate("/");

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Upload failed."
            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <>

            <Navbar
                search=""
                setSearch={() => {}}
                user={user}
            />

            <Sidebar />

            <main className="main-content">

                <div className="banner">

                    <h1>Upload Video</h1>

                    <p>Share your videos with the StreVo community.</p>

                </div>

                <div className="upload-box">

                    <form onSubmit={uploadVideo}>

                        <div className="input-group">

                            <label>Video Title</label>

                            <input
                                type="text"
                                placeholder="Enter video title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label>Description</label>

                            <textarea
                                placeholder="Enter video description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label>Category</label>

                            <input
                                type="text"
                                placeholder="Education, Gaming..."
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label>Thumbnail</label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setThumbnail(e.target.files[0])}
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label>Video File</label>

                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => setVideo(e.target.files[0])}
                                required
                            />

                        </div>

                        <button
                            className="upload-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Uploading..." : "Upload Video"}
                        </button>

                    </form>

                </div>

            </main>

        </>

    );

}

export default Upload;