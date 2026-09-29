import express from "express";

import {
    createComment,
    getComments
} from "../controllers/commentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// Create comment
router.post("/posts/:postId/comments", protect, createComment);
router.get("/posts/:postId/comments", protect, getComments)
export default router;