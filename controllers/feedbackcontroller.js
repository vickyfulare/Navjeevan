import Feedback from "../models/feedbackmodel.js"; // Import your feedback model

// Controller to create a new feedback entry
export const createFeedbackController = async(req, res) => {
    const { name, feedback, datetime } = req.body;

    // Ensure that required fields are present and the image is uploaded
    if (!name || !feedback || !datetime || !req.file) {
        return res.status(400).json({ message: 'All fields are required, including an image file' });
    }

    try {
        // Create a new feedback entry with the data received and the image file path
        const newFeedback = new Feedback({
            name,
            feedback,
            datetime, // Date-time is directly received from the client
            f_image: req.file.path, // Save the file path of the uploaded image
        });

        // Save the new feedback entry in the database
        const savedFeedback = await newFeedback.save();

        // Respond with the saved feedback entry
        res.status(201).json(savedFeedback);
    } catch (error) {
        // Handle errors during the save process
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to get all feedbacks
export const getAllFeedbacksController = async(req, res) => {
    try {
        // Fetch all feedback entries from the database
        const feedbacks = await Feedback.find();

        // Respond with the list of feedbacks
        res.status(200).json(feedbacks);
        console.log(feedbacks)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedbacks', error });
    }
};