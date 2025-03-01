import express from 'express';
import multer from 'multer';
import path from 'path';
import formidable from 'express-formidable';
import { createVideoController, deleteVideoController, getAllVideosController } from '../controllers/videoscontroller.js';
//import { createGalleryController, deleteGalleryController, getAllGalleryController } from '../controllers/gallerycontroller.js';
//import { createVideoController, deleteVideoController, getAllVideosController } from '../controllers/videocontroller.js'; // import video controllers

const router = express.Router();

// Set up multer storage for image and video uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the folder where the uploaded files should be stored
        if (file.mimetype === 'video/mp4') {

            cb(null, 'videosupload'); // For images
        }
    },
    filename: (req, file, cb) => {
        // Add timestamp to filenames to avoid conflicts
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Initialize multer for file upload (supports images and videos)
const gallery_upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.mp4') {
            return cb(new Error('Only .mp4 files are allowed'));
        }
        cb(null, true);
    },
}).single('v_video'); // 'v_video' is the form field name for gallery images and videos


// Routes for Video Handling

const upload = multer({ storage: multer.diskStorage({}) });

router.post('/create-video', upload.single("file"), createVideoController); // Uses same multer setup for video upload

// Route to get all video records
router.get('/get-videos', getAllVideosController);

// router.get('/get-videos-video/:id', getVideoController);

// Route to delete a video entry by ID
router.delete('/delete-video/:id', deleteVideoController);

export default router;