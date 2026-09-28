import Like from "../models/Like.js";
import { Post } from "../models/Post.js";


// Like a post
const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        // Check if post exists
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Check if already liked
        const existingLike = await Like.findOne({
            user: userId,
            post: postId,
        });

        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: "Post already liked",
            });
        }

        // Create like
        await Like.create({
            user: userId,
            post: postId,
        });

        // Increase like count
        await Post.findByIdAndUpdate(postId, {
            $inc: { likesCount: 1 },
        });

        return res.status(201).json({
            success: true,
            message: "Post liked successfully",
        });

    } catch (error) {
        console.error("Like Post Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to like post",
        });
    }
};


// Unlike a post
const unlikePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        // Find and delete like
        const like = await Like.findOneAndDelete({
            user: userId,
            post: postId,
        });

        if (!like) {
            return res.status(400).json({
                success: false,
                message: "Post is not liked",
            });
        }

        // Decrease like count
        await Post.findByIdAndUpdate(postId, {
            $inc: { likesCount: -1 },
        });

        return res.status(200).json({
            success: true,
            message: "Post unliked successfully",
        });

    } catch (error) {
        console.error("Unlike Post Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to unlike post",
        });
    }
};


export {
    likePost,
    unlikePost,
};