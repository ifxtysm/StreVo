import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const location = useLocation();

    return (

        <aside className="sidebar">

            <ul>

                <li
                    className={location.pathname === "/" ? "active" : ""}
                    onClick={() => navigate("/")}
                >

                    <i className="fa-solid fa-house"></i>

                    <span>Home</span>

                </li>

                <hr />

                <li
                    className={location.pathname === "/history" ? "active" : ""}
                    onClick={() => navigate("/history")}
                >

                    <i className="fa-solid fa-clock-rotate-left"></i>

                    <span>History</span>

                </li>

                <li
                    className={location.pathname === "/watchlater" ? "active" : ""}
                    onClick={() => navigate("/watchlater")}
                >

                    <i className="fa-solid fa-bookmark"></i>

                    <span>Watch Later</span>

                </li>

                <li
                    className={location.pathname === "/likedvideos" ? "active" : ""}
                    onClick={() => navigate("/likedvideos")}
                >

                    <i className="fa-solid fa-thumbs-up"></i>

                    <span>Liked Videos</span>

                </li>

            </ul>

        </aside>

    );

}

export default Sidebar;