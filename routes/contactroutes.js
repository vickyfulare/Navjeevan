import express from 'express'
import { createContact, deleteContact, getContacts, updateContact } from '../controllers/contactcontroller.js';

const router = express.Router();

router.post('/add-contact', createContact);
router.get('/get-contacts', getContacts);
router.delete('/delete-contacts/:id', deleteContact);
router.put('/update-contacts/:id', updateContact);


export default router;