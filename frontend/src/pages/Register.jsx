import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        //password restriction 
        const passwordRegex = 
        /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(password)) { 
            alert( "Password must contain at least 6 characters, " + "1 uppercase letter and 1 special character."
            ); 
            return; 
        }

        try {

            await API.post("/auth/register", {
                name,
                email,
                password
            });

            alert("Registration successful");

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        }
    };

    return (

        <div className="auth-container">

            <form
                className="auth-form"
                onSubmit={handleRegister}
            >

                <h2>Create Account</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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
                <small className="password-hint"> 
                    Password must contain: 
                    <br /> 
                    • At least 6 characters 
                    <br /> 
                    • At least 1 uppercase letter 
                    <br /> 
                    • At least 1 special character 
                </small>

                <button type="submit">
                    Register
                </button>

                <p>
                    Already have an account?
                    {" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;