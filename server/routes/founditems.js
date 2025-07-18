import express from 'express';
import {
    getAllFoundItems,
    addFoundItem,
    updateFoundItem,
    deleteFoundItem
} from '../controllers/foundItemController.js';

const router = express.Router();

router.get('/', getAllFoundItems);
router.post('/', addFoundItem);
router.put('/:id', updateFoundItem);
router.delete('/:id', deleteFoundItem);

export default router;
