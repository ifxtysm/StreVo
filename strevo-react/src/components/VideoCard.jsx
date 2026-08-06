import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {

    const navigate = useNavigate();

    function openVideo() {

        navigate(`/watch/${video.id}`);

    }

    return (

        <div
            className="card fade"
            onClick={openVideo}
        >

            <img
                src={`https://strevo-api.onrender.com/uploads/thumbnails/${video.thumbnail_url}`}
                alt={video.title}
            />

            <div className="video-info">

                <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        video.username
                    )}&background=ff4d4f&color=ffffff`}
                    alt={video.username}
                />

                <div className="details">

                    <h3>{video.title}</h3>

                    <p>{video.username}</p>

                    <span>

                        {video.views} Views

                    </span>

                </div>

            </div>

        </div>

    );

}

export default VideoCard;