import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
    vname: {
        type: String,
        required: true, // Video name is required
    },
    v_video: {
        type: String, // Video stored as a string (URL or file path)
        required: true, // Video is required
    },

}, { timestamp: true });

// Create and export the Video model
const Video = mongoose.model('Video', videoSchema);

export default Video;