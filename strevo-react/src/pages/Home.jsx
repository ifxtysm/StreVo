import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

import "../styles/style.css";
import "../styles/home.css";

function Home() {

    const [videos, setVideos] = useState([]);

    const [search, setSearch] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if (!localStorage.getItem("token")) {

            window.location.href = "/login";

            return;

        }

        loadVideos();

    }, []);

    async function loadVideos() {

        try {

            const response = await axios.get(
                "https://strevo-api.onrender.com/api/videos"
            );

            setVideos(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    const filteredVideos = videos.filter(video =>

        video.title.toLowerCase().includes(search.toLowerCase()) ||

        video.username.toLowerCase().includes(search.toLowerCase())

    );
        return (

        <>

            <Navbar

                search={search}

                setSearch={setSearch}

                user={user}

            />

            <Sidebar />

            <main className="main-content">

                <section className="hero fade">

                    <div className="hero-content">

                        <h1>

                            Discover Amazing Videos

                        </h1>

                        <p>

                            Watch trending content, learn new skills and connect with creators around the world.

                        </p>

                    </div>

                </section>

                <section className="videos">

                    {

                        filteredVideos.length > 0 ? (

                            filteredVideos.map(video => (

                                <VideoCard

                                    key={video.id}

                                    video={video}

                                />

                            ))

                        ) : (

                            <h2
                                style={{
                                    color: "#fff",
                                    textAlign: "center",
                                    gridColumn: "1/-1"
                                }}
                            >
                                No videos found.
                            </h2>

                        )

                    }

                </section>

            </main>

        </>

    );

}

export default Home;