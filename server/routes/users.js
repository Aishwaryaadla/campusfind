import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';
import { deleteUserAccount } from '../controllers/userController.js';

const router = express.Router();

router.get('/me', verifyToken, getUserProfile);
router.delete('/delete', verifyToken, deleteUserAccount);

export default router;
