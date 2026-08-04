import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

// Dummy placeholder components to keep the app from crashing
const Login = () => (
    <div className="p-12 font-sans bg-gray-50 min-h-screen text-center">
        <h1 className="text-2xl font-bold text-gray-800">Login Page </h1>
    </div>
);

const Register = () => (
    <div className="p-12 font-sans bg-gray-50 min-h-screen text-center">
        <h1 className="text-2xl font-bold text-gray-800">Register Page</h1>
    </div>
);

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Your clean home landing page */}
                <Route path="/" element={<Landing />} />

                {/* Safe routes so links don't throw reference errors */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}
