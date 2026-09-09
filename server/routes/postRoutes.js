import express from "express";
import { createPost, getAllPosts, getMyPosts } from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/",
    protect,
    upload.single("image"),
    createPost
);

// for all post
router.get("/", protect, getAllPosts);

// for current user's post
router.get("/my-posts", protect, getMyPosts);

export default router;