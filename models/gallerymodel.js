import mongoose from 'mongoose';

const gallerySchema = mongoose.Schema({
    gname: {
        type: String,
        required: true, // Gallery name is required
    },
    g_image: {
        data: Buffer,
        contentType: String,
    },
    date: {
        type: String, // Date stored as a string in "DD-MM-YYYY" format
        required: true, // Date is required
    },
});


// Create and export the Gallery model
const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;