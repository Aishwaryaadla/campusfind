import express from 'express';
import {
    getAllFoundItems,
    addFoundItem,
    updateFoundItem,
    deleteFoundItem
} from '../controllers/foundItemController.js';

import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllFoundItems);
router.post('/', upload.single('image'), addFoundItem);
router.put('/:id', updateFoundItem);
router.delete('/:id', deleteFoundItem);

export default router;
