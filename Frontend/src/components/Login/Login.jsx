import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                username,
                password,
            });
            const { access_token } = response.data;
            localStorage.setItem("token", access_token); // Store the token
            onLogin(); // Notify parent component of successful login
        } catch (error) {
            alert("Invalid username or password");
        }
    };
    return (
        <div>
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;
