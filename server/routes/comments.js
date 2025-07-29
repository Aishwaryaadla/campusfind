// routes/comments.js
import express from 'express';
import { createComment, getCommentsByItem } from '../controllers/commentController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createComment);
router.get('/:itemId', getCommentsByItem);

export default router;
