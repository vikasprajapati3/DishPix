import express from "express";

import {
    createComment,
    deleteComment,
    getComments
} from "../controllers/commentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// Create comment
router.post("/posts/:postId/comments", protect, createComment);
router.get("/posts/:postId/comments", protect, getComments);

//delete comment
router.delete("/comments/:commentId", protect, deleteComment);

export default router;