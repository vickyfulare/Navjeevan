import express from 'express';
import multer from 'multer';
import path from 'path';
import { createFeedbackController, getAllFeedbacksController } from '../controllers/feedbackcontroller.js'; // Import feedback controller

const router = express.Router();

// Set up multer storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the folder where the uploaded files should be stored
        cb(null, 'feedbackuploads');
    },
    filename: (req, file, cb) => {
        // Add timestamp to filenames to avoid conflicts
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Initialize multer for image file upload
const feedback_upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Only allow image files (.jpg, .jpeg, .png)
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
        }
        cb(null, true);
    },
}).single('f_image'); // 'f_image' is the form field name for feedback image

// Route to handle feedback submission
router.post('/add-feedback', feedback_upload, createFeedbackController);

//Route to handle feedback submission
router.get('/get-feedbacks', getAllFeedbacksController);

export default router;