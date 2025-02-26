import express from 'express'
import { addVideo, deleteVideo, getVideos } from '../controllers/youtubecontrolller.js';

const router = express.Router()

router.post('/add-video', addVideo)
router.get('/show-video', getVideos)
router.delete('/delete-video/:id', deleteVideo)
export default router;