import express from "express";

import {
    likePost
} from "../controllers/interactionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// Like / Unlike post
router.post("/posts/:postId/like", protect, likePost);



export default router;