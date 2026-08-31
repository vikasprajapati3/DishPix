import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>

                    <Route path="/" element={<Landing />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="/feed" element={<Feed />} />

                    <Route path="/create-post" element={<CreatePost />} />

                </Routes>
            </Router>
        </AuthProvider>
    );
}