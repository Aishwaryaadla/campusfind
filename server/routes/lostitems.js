import express from 'express';
import {
    getAllItems,
    addItem,
    updateItem,
    deleteItem
} from '../controllers/lostItemController.js';

import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllItems);
router.post('/', upload.single('image'), addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
