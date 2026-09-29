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

export {
    createComment,
    getComments
};