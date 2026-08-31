import Post from "../models/Post.js";

// new post
const createPost = async (req, res) => {
    try {
        const { restaurant, foodName, caption, rating } = req.body;

        let localFilePath = req.file ? req.file.path : "";

        if (!restaurant || !foodName || !caption || !rating) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const result = await cloudinary.uploader
            .upload(localFilePath, {
                folder: "Dishpix/Posts",
                resource_type: "image",
            });

        const post = await Post.create({
            userId: req.user._id,
            restaurant: restaurant,
            foodName: foodName,
            caption: caption,
            rating: rating,
            image: result.secure_url,
        });


        res.status(201).json({
            message: "Post created successfully",
            post: post,
        });

        // Delete temporary image from disk 
        await fs.unlink(localFilePath);

    } catch (error) {
        console.log("POST ERROR:", error);

        if (localFilePath) {
            await fs.unlink(localFilePath);
        }

        res.status(500).json({
            message: error.message,
        });
    }
};

export default createPost;