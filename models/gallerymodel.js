import mongoose from 'mongoose';

const gallerySchema = mongoose.Schema({
    gname: {
        type: String,
        required: true, // Gallery name is required
    },
    g_image: {
        type: String, // Image stored as a string (URL or base64)
        required: true, // Image is required
    },
    date: {
        type: String, // Date stored as a string in "DD-MM-YYYY" format
        required: true, // Date is required
    },
});

// Create and export the Gallery model
const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;