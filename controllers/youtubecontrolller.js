import YoutubeVideo from "../models/youtubevideos.js"

// Add a new video
export const addVideo = async(req, res) => {
    try {
        const { vname, video_link } = req.body;
        if (!vname || !video_link) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newVideo = new YoutubeVideo({ vname, video_link });
        await newVideo.save();
        res.status(201).json({ message: "Video added successfully", newVideo });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getVideos = async(req, res) => {
    try {
        const videos = await YoutubeVideo.find().sort({ date: -1 });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: "Error fetching videos" });
    }
};


// Delete a video by ID
export const deleteVideo = async(req, res) => {
    try {
        const { id } = req.params;
        const video = await YoutubeVideo.findById(id);

        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        await YoutubeVideo.findByIdAndDelete(id);
        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting video" });
    }
};