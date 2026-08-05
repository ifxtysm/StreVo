import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

import "../styles/style.css";
import "../styles/history.css";

function History() {

    const [videos, setVideos] = useState([]);

    const [search, setSearch] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const history = JSON.parse(

            localStorage.getItem("history")

        ) || [];

        setVideos(history);

    }, []);

    const filteredVideos = videos.filter(video =>

        video.title.toLowerCase().includes(search.toLowerCase()) ||

        video.username.toLowerCase().includes(search.toLowerCase())

    );

    function clearHistory() {

        if (!window.confirm("Clear watch history?")) return;

        localStorage.removeItem("history");

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

                    <h1>Watch History</h1>

                    <p>

                        Videos you've watched on StreVo.

                    </p>

                    {

                        videos.length > 0 &&

                        <button

                            className="delete-btn"

                            onClick={clearHistory}

                        >

                            Clear History

                        </button>

                    }

                </div>

                <section className="videos">

                    {

                        filteredVideos.length === 0 ?

                        (

                            <h2 className="empty">

                                No watch history.

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

export default History;