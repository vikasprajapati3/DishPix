import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/",
    protect,
    upload.single("image"),
    createPost
);

// Get all posts for feed
router.get(
    "/",
    protect,
    getAllPosts
);

export default router;