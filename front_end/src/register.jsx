
import { useState } from "react";
import "./App.css";

function Register({ setShowRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        setMessage("");

        const response = await fetch(
            "https://note-taking-app-kz5a.onrender.com/api/register/",
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
            setMessage("Registration successful! You can now login.");
            setTimeout(() => setShowRegister(false), 1200);
            return;
        }

        setMessage(data?.detail || JSON.stringify(data) || "Registration failed");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Create account</h1>

                {message && <div className="auth-error">{message}</div>}

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

                    <button className="auth-button" onClick={handleRegister}>Register</button>
                </div>

                <p className="auth-toggle">
                    Already have an account?
                    <button onClick={() => setShowRegister(false)}>Login</button>
                </p>
            </div>
        </div>
    );
}

export default Register;

