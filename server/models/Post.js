import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        restaurant: {
            type: String,
            required: true,
            trim: true,
        },

        foodName: {
            type: String,
            required: true,
            trim: true,
        },

        caption: {
            type: String,
            required: true,
            trim: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        image: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            default: "",
            trim: true,
        },

        likesCount: {
            type: Number,
            default: 0,
        },

        commentsCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);


const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },

        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);


const Comment = mongoose.model("Comment", commentSchema);




export { Post, Comment };