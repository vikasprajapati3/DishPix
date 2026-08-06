import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from './pages/Feed';

// Dummy placeholder components to keep the app from crashing




export default function App() {
    return (
        <Router>
            <Routes>
                {/* Your clean home landing page */}
                <Route path="/" element={<Landing />} />

                {/* Safe routes so links don't throw reference errors */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/feed" element={<Feed />} />
            </Routes>
        </Router>
    );
}
