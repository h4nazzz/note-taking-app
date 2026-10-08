import { useState } from "react";
import Login from "./login";
import Notes from "./notes";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    if (!loggedIn) {
        return <Login setLoggedIn={setLoggedIn} />;
    }

    return <Notes />;
}

export default App;