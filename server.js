import express from 'express';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';
import programRoutes from './routes/programroutes.js';
import galleryRoutes from './routes/galleryroutes.js'
import feedbackRoutes from './routes/feedbackroutes.js'
import volunteerRoutes from './routes/volunteerroutes.js'
import videosRoutes from './routes/videosrouters.js'
import contactRoutes from './routes/contactroutes.js'
import userRoutes from './routes/userRoutes.js'
import youtubeRoutes from './routes/youtuberoutes.js'
import path from 'path';
import { fileURLToPath } from 'url'; // Required to use __dirname in ES6 modules

// Create the Express app
const app = express();

// Configure dotenv
dotenv.config();

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Define __dirname for ES6 modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
app.use('/api/v1/program', programRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/volunteer', volunteerRoutes);
app.use('/api/v1/videos', videosRoutes);
app.use('/api/v1/contact', contactRoutes)
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/youtube', youtubeRoutes)

app.use(cors({
    origin: "https://navjeevankendra.webcraftersinfotech.in/", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the "galleryupload" directory
app.use('/galleryupload', express.static('galleryupload'));


// Serve static files from the "feedbackupload" directory
app.use('/feedbackuploads', express.static('feedbackuploads'));


// Serve static files from the "feedbackupload" directory
app.use('/videosupload', express.static('videosupload'));


// Define the port
const PORT = process.env.PORT || 8086;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.cyan.bold);
});