import express from 'express';
import { sendMessage, getMessagesByItem } from '../controllers/messageController.js';

const router = express.Router();

router.post('/', sendMessage); 
router.get('/:itemId', getMessagesByItem); 

export default router;
