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

// LIKE

const likeSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);


// One user can like a post only once
likeSchema.index(
    {
        userId: 1,
        postId: 1,
    },
    {
        unique: true,
    }
);


const Like = mongoose.model("Like", likeSchema);

// COMMENT

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




export default { Post, Like, Comment };