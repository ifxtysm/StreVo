import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

import "../styles/style.css";
import "../styles/watch.css";

function Watch() {

    const { id } = useParams();

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    const [video, setVideo] = useState(null);

    const [comments, setComments] = useState([]);

    const [relatedVideos, setRelatedVideos] = useState([]);

    const [comment, setComment] = useState("");

    useEffect(() => {

        increaseViews();

        loadVideo();

        loadComments();

        loadRelatedVideos();

    }, [id]);

    async function increaseViews() {

        try {

            await axios.put(

                `http://localhost:3000/api/videos/view/${id}`

            );

        }

        catch (error) {

            console.log(error);

        }

    }

    async function loadVideo() {

        try {

            const response = await axios.get(

                "http://localhost:3000/api/videos"

            );

            const currentVideo = response.data.find(

                item => item.id == id

            );

            if (!currentVideo) {

                alert("Video not found");

                navigate("/");

                return;

            }

            setVideo(currentVideo);

            let history = JSON.parse(

                localStorage.getItem("history")

            ) || [];

            history = history.filter(

                item => item.id != currentVideo.id

            );

            history.unshift(currentVideo);

            localStorage.setItem(

                "history",

                JSON.stringify(history.slice(0, 50))

            );

        }

        catch (error) {

            console.log(error);

        }

    }
        async function loadComments() {

        try {

            const response = await axios.get(

                `http://localhost:3000/api/comments/${id}`

            );

            setComments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function postComment() {

        if (!token) {

            alert("Login first");

            return;

        }

        if (comment.trim() === "") return;

        try {

            await axios.post(

                "http://localhost:3000/api/comments",

                {

                    comment,

                    video_id: id

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setComment("");

            loadComments();

        }

        catch (error) {

            console.log(error);

        }

    }

    async function loadRelatedVideos() {

        try {

            const response = await axios.get(

                `http://localhost:3000/api/videos/related/${id}`

            );

            setRelatedVideos(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    function likeVideo() {

        if (!video) return;

        let likedVideos = JSON.parse(

            localStorage.getItem("likedVideos")

        ) || [];

        if (!likedVideos.find(v => v.id == video.id)) {

            likedVideos.unshift(video);

            localStorage.setItem(

                "likedVideos",

                JSON.stringify(likedVideos)

            );

            alert("Added to Liked Videos");

        }

        else {

            alert("Already liked");

        }

    }

    function saveVideo() {

        if (!video) return;

        let watchLater = JSON.parse(

            localStorage.getItem("watchLater")

        ) || [];

        if (!watchLater.find(v => v.id == video.id)) {

            watchLater.unshift(video);

            localStorage.setItem(

                "watchLater",

                JSON.stringify(watchLater)

            );

            alert("Added to Watch Later");

        }

        else {

            alert("Already saved");

        }

    }

    function shareVideo() {

        navigator.clipboard.writeText(

            window.location.href

        );

        alert("Video link copied!");

    }
        if (!video) {

        return <h2 style={{ color: "#fff", textAlign: "center", marginTop: "100px" }}>Loading...</h2>;

    }

    return (

        <>

            <Navbar

                search=""

                setSearch={() => {}}

                user={user}

            />

            <div className="watch-container">

                <section className="video-section">

                    <video controls>

                        <source
                            src={`http://localhost:3000/uploads/videos/${video.video_url}`}
                        />

                    </video>

                    <h2>{video.title}</h2>

                    <div className="video-meta">

                        <span>{video.views} Views</span>

                        <span>{video.category}</span>

                    </div>

                    <div className="video-actions">

                        <button onClick={likeVideo}>

                            <i className="fa-solid fa-thumbs-up"></i>

                            Like

                        </button>

                        <button>

                            <i className="fa-solid fa-thumbs-down"></i>

                            Dislike

                        </button>

                        <button onClick={shareVideo}>

                            <i className="fa-solid fa-share"></i>

                            Share

                        </button>

                        <button onClick={saveVideo}>

                            <i className="fa-solid fa-bookmark"></i>

                            Save

                        </button>

                    </div>

                    <div className="channel-box">

                        <div className="channel-info">

                            <img

                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(video.username)}&background=ff4d4f&color=ffffff`}

                                alt={video.username}

                            />

                            <div>

                                <h3>{video.username}</h3>

                                <span>StreVo Creator</span>

                            </div>

                        </div>

                        <button className="subscribe-btn">
                            
                           Subscribe

                        </button>

                    </div>

                    <div className="description">

                        <h3>Description</h3>

                        <p>{video.description}</p>

                    </div>

                    <div className="comments">

                        <h3>Comments</h3>

                        <div className="comment-form">

                     <textarea

                      placeholder="Add a comment..."
                        
                      value={comment}
                      
                      onChange={(e) => setComment(e.target.value)}
                          
                          />

                                <button
                        
                        className="comment-btn"
                              
                        onClick={postComment}
                                  
                                  >
                             
                              Add Comment
                          
                           </button>

                             </div>

                        <div className="commentsContainer">

                            {

                                comments.map(item => (

                                    <div

                                        key={item.id}

                                        className="comment"

                                    >

                                        <img

                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.username)}&background=ff4d4f&color=ffffff`}

                                            alt={item.username}

                                        />

                                        <div>

                                            <h4>{item.username}</h4>

                                            <p>{item.comment}</p>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                </section>
                                <aside className="related">

                    <h3>Related Videos</h3>

                    {

                        relatedVideos.map(item => (

                            <div

                                key={item.id}

                                className="related-card"

                                onClick={() => navigate(`/watch/${item.id}`)}

                            >

                                <img

                                    src={`http://localhost:3000/uploads/thumbnails/${item.thumbnail_url}`}

                                    alt={item.title}

                                />

                                <div>

                                    <h4>{item.title}</h4>

                                    <span>{item.username}</span>

                                </div>

                            </div>

                        ))

                    }

                </aside>

            </div>

        </>

    );

}

export default Watch;