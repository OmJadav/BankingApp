import express from 'express'
import { loginUser, logoutUser, signupUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddlerware.js';

const router = express.Router();

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', authMiddleware, logoutUser)
export default router;