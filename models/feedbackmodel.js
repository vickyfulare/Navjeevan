import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    f_image: {
        type: String, // Image stored as a string (URL or base64)
        required: true,
    },
    datetime: {
        type: String, // Store the date and time in DD-MM-YYYY format
        required: true,
    },
}, { timestamp: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;