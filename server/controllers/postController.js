import Post from "../models/Post.js";

// new post
const createPost = async (req, res) => {
    try {
        const { restaurant, foodName, caption, rating, image } = req.body;

        if (!restaurant || !foodName || !caption || !rating) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const post = await Post.create({
            userId: req.user._id,
            restaurant: restaurant,
            foodName: foodName,
            caption: caption,
            rating: rating,
            image: req.file ? req.file.path : "",
        });


        res.status(201).json({
            message: "Post created successfully",
            post: post,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export default createPost;