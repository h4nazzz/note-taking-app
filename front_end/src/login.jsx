import { useState } from "react";
import "./App.css";

function Login({ setLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
            setError("Please enter both username and password.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(
                "https://note-taking-app-kz5a.onrender.com/api/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: trimmedUsername,
                        password: trimmedPassword,
                    }),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok || !data.access) {
                const message = data.detail || data.non_field_errors?.[0] || "Login failed. Please check your credentials.";
                throw new Error(message);
            }

            localStorage.setItem("access", data.access);
            if (data.refresh) {
                localStorage.setItem("refresh", data.refresh);
            }
            setLoggedIn(true);
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
            />

            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}

export default Login;
