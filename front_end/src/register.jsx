
import { useState } from "react";

function Register({ setShowRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
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

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! You can now login.");
            setShowRegister(false);
        } else {
            alert(JSON.stringify(data));
        }
    };

    return (
        <div>
            <h1>Register</h1>

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

            <button onClick={handleRegister}>Register</button>

            <p>
                Already have an account?
                <button onClick={() => setShowRegister(false)}>
                    Login
                </button>
            </p>
        </div>
    );
}

export default Register;

