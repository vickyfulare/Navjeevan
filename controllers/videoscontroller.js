import Video from "../models/videosmodel.js"; // Import the video schema

// Controller to create a new video entry
export const createVideoController = async(req, res) => {
    const { vname } = req.body;

    // Ensure that required fields are present and the video file is uploaded
    if (!vname || !req.file) {
        return res.status(400).json({ message: 'All fields are required, including a video file' });
    }

    try {
        // Create a new video entry with the data received and the video file path
        const newVideo = new Video({
            vname,
            v_video: req.file.path, // Save the file path of the uploaded video
        });

        // Save the new video entry in the database
        const savedVideo = await newVideo.save();

        // Respond with the saved video entry
        res.status(201).json(savedVideo);
    } catch (error) {
        // Handle errors during the save process
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to fetch all video entries
export const getAllVideosController = async(req, res) => {
    try {
        // Fetch all video records from the database
        const videos = await Video.find();

        // Respond with the fetched video records
        res.status(200).json(videos);
    } catch (error) {
        // Handle any errors during the fetch process
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to delete a video entry by ID
export const deleteVideoController = async(req, res) => {
    const { id } = req.params;

    try {
        // Find the video entry by ID and delete it
        const deletedVideo = await Video.findByIdAndDelete(id);

        // If no video entry is found, return an error response
        if (!deletedVideo) {
            return res.status(404).json({ message: "Video entry not found" });
        }

        // Respond with success message
        res.status(200).json({ message: "Video entry deleted successfully" });
    } catch (error) {
        // Handle any errors during the delete process
        res.status(500).json({ message: "Server error", error });
    }
};