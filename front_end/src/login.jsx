
import { useState } from "react";
import "./App.css";

function Login({ setLoggedIn, setShowRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        const response = await fetch(
            "https://note-taking-app-kz5a.onrender.com/api/login/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        );

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            setLoggedIn(true);
            return;
        }

        setError(data.detail || "Invalid username or password");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Welcome back</h1>

                {error && <div className="auth-error">{error}</div>}

                <div className="auth-form">
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="auth-button" onClick={handleLogin}>Login</button>
                </div>

                <p className="auth-toggle">
                    Don't have an account?
                    <button onClick={() => setShowRegister(true)}>Register</button>
                </p>
            </div>
        </div>
    );
}

export default Login;

