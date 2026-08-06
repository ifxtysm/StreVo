import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "../styles/style.css";
import "../styles/register.css";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function register(e) {

        e.preventDefault();

        setLoading(true);

        try {

            await axios.post(

                "https://strevo-api.onrender.com/api/auth/register",

                {

                    username,

                    email,

                    password

                }

            );

            alert("Registration Successful");

            navigate("/login");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

        finally {

            setLoading(false);

        }

    }
        return (

        <div className="register-page">

            <div className="register-box fade">

                <div className="register-header">

                    <i className="fa-solid fa-play"></i>

                    <h1>StreVo</h1>

                    <p>Create your account</p>

                </div>

                <form onSubmit={register}>

                    <div className="input-group">

                        <label>Username</label>

                        <input

                            type="text"

                            placeholder="Enter your username"

                            value={username}

                            onChange={(e) => setUsername(e.target.value)}

                            required

                        />

                    </div>

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

                        className="register-btn"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Creating Account..."

                                : "Register"

                        }

                    </button>

                </form>

                <p className="bottom-text">

                    Already have an account?{" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;