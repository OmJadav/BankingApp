import express from 'express'
import { getAllUsers, getUser } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddlerware.js';

const router = express.Router();

router.get('/getallusers', getAllUsers)
router.get('/profile', authMiddleware, getUser)

export default router;