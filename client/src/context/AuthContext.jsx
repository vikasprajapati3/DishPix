import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreUser = async () => {
            const token = localStorage.getItem("token");

            // No token means user is not logged in
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/users/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser({
                    ...response.data,
                    token,
                });

            } catch (error) {
                console.error("Auth restore error:", error);

                // if invalid/expired token
                localStorage.removeItem("token");
                setUser(null);

            } finally {
                setLoading(false);
            }
        };

        restoreUser();
    }, []);

    // Login/Register
    const login = (userData) => {
        localStorage.setItem("token", userData.token);

        setUser(userData);
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};