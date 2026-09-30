import Comment from "../models/Comment.js";
import Post from "../models/Post.js";


// Create Comment
const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        // Validate text
        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment text is required",
            });
        }

        // Check post
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Create comment
        const comment = await Comment.create({
            user: userId,
            post: postId,
            text: text.trim(),
        });

        // Increase comment count
        await Post.findByIdAndUpdate(postId, {
            $inc: { commentsCount: 1 },
        });

        // Get user information
        await comment.populate("user", "username profileImage");

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment,
        });

    } catch (error) {
        console.error("Create Comment Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add comment",
        });
    }
};


// Get Comments
const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        // Check post
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Get comments
        const comments = await Comment.find({ post: postId })
            .populate("user", "username profileImage")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: comments.length,
            comments,
        });

    } catch (error) {
        console.error("Get Comments Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get comments",
        });
    }
};

// Delete Comment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        // Find comment
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // Find post
        const post = await Post.findById(comment.post);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Check authorization
        const isCommentOwner =
            comment.user.toString() === userId.toString();

        const isPostOwner =
            post.userId.toString() === userId.toString();

        if (!isCommentOwner && !isPostOwner) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment",
            });
        }

        // Delete comment
        await Comment.findByIdAndDelete(commentId);

        // Decrease comment count
        await Post.findByIdAndUpdate(comment.post, {
            $inc: { commentsCount: -1 },
        });

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });

    } catch (error) {
        console.error("Delete Comment Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete comment",
        });
    }
};

export {
    createComment,
    getComments,
    deleteComment
};