import mongoose from "mongoose";

const youtubevideoSchema = new mongoose.Schema({
    vname: {
        type: String,
        required: true,
        trim: true,
    },
    video_link: {
        type: String,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model("YoutubeVideo", youtubevideoSchema);