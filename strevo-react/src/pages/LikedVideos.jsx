import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

import "../styles/style.css";
import "../styles/liked.css";

function LikedVideos() {

    const [videos, setVideos] = useState([]);

    const [search, setSearch] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const likedVideos = JSON.parse(

            localStorage.getItem("likedVideos")

        ) || [];

        setVideos(likedVideos);

    }, []);

    const filteredVideos = videos.filter(video =>

        video.title.toLowerCase().includes(search.toLowerCase()) ||

        video.username.toLowerCase().includes(search.toLowerCase())

    );

    function clearLikedVideos() {

        if (!window.confirm("Remove all liked videos?")) return;

        localStorage.removeItem("likedVideos");

        setVideos([]);

    }

    return (

        <>

            <Navbar

                search={search}

                setSearch={setSearch}

                user={user}

            />

            <Sidebar />

            <main className="main-content">

                <div className="banner">

                    <h1>Liked Videos</h1>

                    <p>

                        Videos you've liked on StreVo.

                    </p>

                    {

                        videos.length > 0 &&

                        <button

                            className="delete-btn"

                            onClick={clearLikedVideos}

                        >

                            Clear Likes

                        </button>

                    }

                </div>

                <section className="videos">

                    {

                        filteredVideos.length === 0 ?

                        (

                            <h2 className="empty">

                                No liked videos.

                            </h2>

                        )

                        :

                        (

                            filteredVideos.map(video => (

                                <VideoCard

                                    key={video.id}

                                    video={video}

                                />

                            ))

                        )

                    }

                </section>

            </main>

        </>

    );

}

export default LikedVideos;