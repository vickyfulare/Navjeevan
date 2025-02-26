import express from 'express'
import { deleteUser, forgotPasswordController, getUsers, loginUser, registerUser } from '../controllers/userController.js';
import authMiddleware from "../middlewares/userMiddleware.js";
const router = express.Router()


router.post('/register', registerUser);

router.post("/login", loginUser);
router.post("/forgot-password", forgotPasswordController);
router.get("/users", authMiddleware, getUsers);
router.delete("/users/:id", authMiddleware, deleteUser);

export default router;