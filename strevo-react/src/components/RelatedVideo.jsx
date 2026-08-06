import { useNavigate } from "react-router-dom";

function RelatedVideo({ video }) {

    const navigate = useNavigate();

    return (

        <div
            className="related-video"
            onClick={() => navigate(`/watch/${video.id}`)}
        >

            <img
                src={`https://strevo-api.onrender.com/uploads/thumbnails/${video.thumbnail_url}`}
                alt={video.title}
            />

            <div className="related-info">

                <h4>{video.title}</h4>

                <p>{video.username}</p>

                <span>{video.views} Views</span>

            </div>

        </div>

    );

}

export default RelatedVideo;