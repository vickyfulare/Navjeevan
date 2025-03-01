import Video from "../models/videosmodel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import dotenv from 'dotenv'
// ✅ Multer Storage (For Handling File Upload)
const storage = multer.diskStorage({});
const upload = multer({ storage });

dotenv.config();

// ✅ Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ✅ Upload Video to Cloudinary & Save to MongoDB
export const createVideoController = async(req, res) => {
    try {
        console.log("Received Request:", req.body, req.file);

        const { vname, videoUrl } = req.body;

        if (!vname || !videoUrl) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newVideo = new Video({ vname, videoUrl });
        await newVideo.save();

        res.status(201).json({ message: "Video uploaded successfully!", video: newVideo });

    } catch (error) {
        console.error("Error uploading video:", error);
        res.status(500).json({ message: "Server error. Try again later." });
    }
};
// ✅ Get All Videos
export const getAllVideosController = async(req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Videos fetched successfully",
            videos,
        });
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching videos",
            error: error.message,
        });
    }
};

// ✅ Delete Video from Cloudinary & MongoDB
export const deleteVideoController = async(req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        // ✅ Extract Cloudinary public_id and delete from Cloudinary
        const publicId = video.videoUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`videos/${publicId}`, { resource_type: "video" });

        // ✅ Delete from MongoDB
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Video deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting video:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting video",
            error: error.message,
        });
    }
};