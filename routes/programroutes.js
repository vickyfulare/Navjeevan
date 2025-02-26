import express from 'express'
import formidable from 'express-formidable';
import { createProgramController, deleteProgram, getAllPrograms, getProgramById, updateProgram } from '../controllers/programcontroller.js'
import upload from '../middlewares/upload.js';

const router = express.Router()

// Routes for Post
router.post('/create-program', upload.single('p_image'), createProgramController)

//router.get('/get-programs', getAllProgramsController)
// GET all programs
router.get('/get-programs', getAllPrograms);

router.get('/get-program/:id', getProgramById);

router.delete('/delete-program/:id', deleteProgram);

router.put('/update-program/:id', updateProgram);


export default router;