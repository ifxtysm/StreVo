import { useNavigate } from "react-router-dom";

function Navbar({ search, setSearch, user }) {

    const navigate = useNavigate();

    function logout() {

        if (!window.confirm("Are you sure you want to logout?")) return;

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    }

    return (

        <header className="navbar">

            <div className="nav-left">

                <button className="menu-btn">

                    <i className="fa-solid fa-bars"></i>

                </button>

                <div
                    className="logo"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >

                    <i className="fa-solid fa-play"></i>

                    <span>StreVo</span>

                </div>

            </div>

            <div className="search-container">

                <input

                    type="text"

                    placeholder="Search videos"

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <button>

                    <i className="fa-solid fa-magnifying-glass"></i>

                </button>

            </div>

            <div className="nav-right">

                <button
                    id="uploadBtn"
                    onClick={() => navigate("/upload")}
                >

                    <i className="fa-solid fa-upload"></i>

                </button>

                <button>

                    <i className="fa-regular fa-bell"></i>

                </button>

                <div className="user-menu">

                    <img

                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user?.username || "User"
                        )}&background=ff4d4f&color=ffffff`}

                        alt="User"

                    />

                    <button
                        id="logoutBtn"
                        onClick={logout}
                    >

                        Logout

                    </button>

                </div>

            </div>

        </header>

    );

}

export default Navbar;