import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    vname: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String, // Store video URL instead of binary data
        required: true,
    },
}, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);

export default Video;