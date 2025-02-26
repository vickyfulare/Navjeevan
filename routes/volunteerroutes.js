import express from 'express'
import { createVolunteer, deleteVolunteer, getVolunteers, updateVolunteer } from '../controllers/volunteercontroller.js';
//import formidable from 'express-formidable';
//import upload from '../middlewares/upload.js';

//import multer from 'multer';
//import path from 'path';

const router = express.Router()

// Routes for Post
router.post('/create-volunteer', createVolunteer)

// Route to get all gallery records
router.get('/get-volunteer', getVolunteers);

router.delete('/delete-volunteer/:id', deleteVolunteer);

router.put('/update-volunteer/:id', updateVolunteer);

export default router;