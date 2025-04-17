import React, { useState } from "react";
import axios from "axios";
import './Login.css'

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
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Admin Login</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
}
export default Login;
