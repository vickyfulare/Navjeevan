import express from 'express'
import formidable from 'express-formidable';
import { createProgramController, deleteProgramController, getAllProgramsController, getProgramByIdController, getProgramImageController } from '../controllers/programcontroller.js'
import upload from '../middlewares/upload.js';

const router = express.Router()

// Routes for Post
router.post('/create-program', formidable(), createProgramController)

//router.get('/get-programs', getAllProgramsController)
// GET all programs
router.get('/get-programs', getAllProgramsController);

router.get('/get-program/:id', getProgramByIdController);

router.get('/get-program-image/:id', getProgramImageController);

router.delete('/delete-program/:id', deleteProgramController);

//router.put('/update-program/:id', updateProgram);


export default router;