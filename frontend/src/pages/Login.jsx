import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        }
    };

    return (

        <div className="auth-container">

            <form className="auth-form" onSubmit={handleLogin}>

                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p>
                    Don't have an account?
                    {" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Login;