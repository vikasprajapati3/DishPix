import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";

import ProtectedRoute from "./components/ProtectedRoute";
import Search from "./pages/SearchPage";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>

                    <Route path="/" element={<Landing />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />


                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/notifications" element={<Notification />} />

                    </Route>

                </Routes>
            </Router>
        </AuthProvider>
    );
}