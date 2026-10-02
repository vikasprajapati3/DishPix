import express from "express";

import {
    likePost,
    unlikePost,
} from "../controllers/likeController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Like a post
router.post("/:postId/like", protect, likePost);

// Unlike a post
router.delete("/:postId/like", protect, unlikePost);


export default router;