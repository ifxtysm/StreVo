import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "../styles/style.css";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function login(e) {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(
    "https://strevo-api.onrender.com/api/auth/login",
    {
        email,
        password
    }
);
            localStorage.setItem(

                "token",

                response.data.token

            );

            localStorage.setItem(

                "user",

                JSON.stringify(response.data.user)

            );

            alert("Login Successful");

            navigate("/");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Login Failed"

            );

        }

        finally {

            setLoading(false);

        }

    }
        return (

        <div className="login-page">

            <div className="login-box fade">

                <div className="login-header">

                    <i className="fa-solid fa-play"></i>

                    <h1>StreVo</h1>

                    <p>Sign in to continue</p>

                </div>

                <form onSubmit={login}>

                    <div className="input-group">

                        <label>Email</label>

                        <input

                            type="email"

                            placeholder="Enter your email"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            required

                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input

                            type="password"

                            placeholder="Enter your password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                            required

                        />

                    </div>

                    <button

                        type="submit"

                        className="login-btn"

                        disabled={loading}

                    >

                        {

                            loading

                            ? "Signing In..."

                            : "Login"

                        }

                    </button>

                </form>

                <p className="bottom-text">

                    Don't have an account?{" "}

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;