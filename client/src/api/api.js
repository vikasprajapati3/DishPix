import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL?.replace(/\/+$/, "")
});

// Attach Token automatically to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

// User API functions
export const getMe = () => api.get("/api/users/me");

export const updateMe = (userData) =>
    api.patch("/api/users/me", userData);

export default api;
