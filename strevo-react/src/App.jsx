import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watch from "./pages/Watch";
import Upload from "./pages/Upload";
import History from "./pages/History";
import WatchLater from "./pages/WatchLater";
import LikedVideos from "./pages/LikedVideos";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/watch/:id" element={<Watch />} />

            <Route path="/upload" element={<Upload />} />

            <Route path="/history" element={<History />} />

            <Route path="/watchlater" element={<WatchLater />} />

            <Route path="/likedvideos" element={<LikedVideos />} />

            <Route path="*" element={<Navigate to="/" />} />

        </Routes>

    );

}

export default App;