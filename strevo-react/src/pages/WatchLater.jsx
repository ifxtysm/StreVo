import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

import "../styles/style.css";
import "../styles/watchlater.css";

function WatchLater() {

    const [videos, setVideos] = useState([]);

    const [search, setSearch] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const savedVideos = JSON.parse(

            localStorage.getItem("watchLater")

        ) || [];

        setVideos(savedVideos);

    }, []);

    const filteredVideos = videos.filter(video =>

        video.title.toLowerCase().includes(search.toLowerCase()) ||

        video.username.toLowerCase().includes(search.toLowerCase())

    );

    function clearWatchLater() {

        if (!window.confirm("Remove all saved videos?")) return;

        localStorage.removeItem("watchLater");

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

                    <h1>Watch Later</h1>

                    <p>

                        Videos you've saved to watch later.

                    </p>

                    {

                        videos.length > 0 &&

                        <button

                            className="delete-btn"

                            onClick={clearWatchLater}

                        >

                            Clear List

                        </button>

                    }

                </div>

                <section className="videos">

                    {

                        filteredVideos.length === 0 ?

                        (

                            <h2 className="empty">

                                No saved videos.

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

export default WatchLater;