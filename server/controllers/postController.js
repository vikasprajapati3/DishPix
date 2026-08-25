import Post from "../models/Post.js";

// new post
export const createPost = async (req, res) => {
    try {
        const { restaurant, foodName, caption, rating, image } = req.body;

        const post = new Post({
            userId: req.user._id,
            restaurant: restaurant,
            foodName: foodName,
            caption: caption,
            rating: rating,
            image: image,
        });

        await post.save();

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
