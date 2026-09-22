import { Post, Like, Comment } from "../models/Post.js";

export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // Check post
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        // Check existing like
        const existingLike = await Like.findOne({
            userId: req.user._id,
            postId: postId,
        });

        // Unlike
        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);

            post.likesCount = Math.max(0, post.likesCount - 1);
            await post.save();

            return res.status(200).json({
                message: "Post unliked",
                liked: false,
                likesCount: post.likesCount,
            });
        }

        // Like
        await Like.create({
            userId: req.user._id,
            postId: postId,
        });

        post.likesCount += 1;
        await post.save();

        return res.status(200).json({
            message: "Post liked",
            liked: true,
            likesCount: post.likesCount,
        });

    } catch (error) {
        console.log("LIKE ERROR:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

