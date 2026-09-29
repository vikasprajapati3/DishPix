import express from "express";

import {
    createComment
} from "../controllers/commentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// Create comment
router.post("/posts/:postId/comments", protect, createComment);

export default router;