import mongoose from 'mongoose';

const programSchema = mongoose.Schema({
    pname: {
        type: String,
        required: true, // Program name is required
    },
    date: {
        type: String, // Date stored as string (e.g., "2025-01-28")
        required: true, // Date is required
    },
    pdescription: {
        type: String,
        required: true, // Program description is required
    },
    p_image: {
        type: String, // Path or URL of the uploaded image
        required: true, // Image is required
    },
});

const Program = mongoose.model('Program', programSchema);

export default Program;