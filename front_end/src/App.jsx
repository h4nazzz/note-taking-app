import { useState } from "react";
import Login from "./login";
import Register from "./register";
import Notes from "./notes";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    if (loggedIn) {
        return <Notes />;
    }

    if (showRegister) {
        return <Register setShowRegister={setShowRegister} />;
    }

    return (
        <Login
            setLoggedIn={setLoggedIn}
            setShowRegister={setShowRegister}
        />
    );
}

export default App;

