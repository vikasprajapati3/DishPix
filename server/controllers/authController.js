import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register User
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        // Check username OR email already exists
        const userExists = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username },
            ],
        });

        if (userExists) {
            return res.status(400).json({
                message: "Username or email already exists",
            });
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// Login User
export const loginUser = async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({
                message: "Please enter username/email and password",
            });
        }

        // Find user using username OR email
        const user = await User.findOne({
            $or: [
                { email: login.toLowerCase() },
                { username: login },
            ],
        }).select("+password");

        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        }

        return res.status(401).json({
            message: "Invalid username/email or password",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// Current User
export const getMe = async (req, res) => {
    res.json(req.user);
};

// Update User
export const updateProfile = async (req, res) => {
    try {
        const {
            username,
            email,
            fullName,
            bio,
            profileImage,
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Check username uniqueness
        if (username && username.trim() !== user.username) {
            const usernameExists = await User.findOne({
                username: username.trim(),
                _id: { $ne: user._id },
            });

            if (usernameExists) {
                return res.status(400).json({
                    message: "Username already exists",
                });
            }

            user.username = username.trim();
        }

        // Check email uniqueness
        if (email && email.trim().toLowerCase() !== user.email) {
            const emailExists = await User.findOne({
                email: email.trim().toLowerCase(),
                _id: { $ne: user._id },
            });

            if (emailExists) {
                return res.status(400).json({
                    message: "Email already exists",
                });
            }

            user.email = email.trim().toLowerCase();
        }

        // Update other profile fields
        if (fullName !== undefined) {
            user.fullName = fullName.trim();
        }

        if (bio !== undefined) {
            user.bio = bio.trim();
        }

        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }

        const updatedUser = await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                fullName: updatedUser.fullName,
                bio: updatedUser.bio,
                profileImage: updatedUser.profileImage,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};