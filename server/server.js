import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://dishpix.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`New Request: ${req.method}`);
    next();
});
// Home Route
app.get("/", (req, res) => {
    res.send("FoodSnap API is Running...");
});

// Routes
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});