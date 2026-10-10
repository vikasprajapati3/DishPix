import express from "express";
import { getMe, updateProfile, uploadProfileImage } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.get("/me", protect, getMe);
router.patch("/me", protect, updateProfile); //update user profile 

router.patch("/me/profile-image",
    protect,
    upload.single("profileImage"),
    uploadProfileImage);


export default router;