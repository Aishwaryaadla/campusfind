import express from 'express';
import {
    getAllFoundItems,
    addFoundItem,
    updateFoundItem,
    deleteFoundItem,
    getItemById,
    getFoundItemsByUser,
    markFoundItemReturned
} from '../controllers/foundItemController.js';

import upload from '../middleware/upload.js';

const router = express.Router();


router.get('/user/:rollNo', getFoundItemsByUser);
router.get('/', getAllFoundItems);
router.post('/', upload.single('image'), addFoundItem);
router.put('/:id', updateFoundItem);
router.delete('/:id', deleteFoundItem);
router.get('/:id', getItemById);
router.put('/return/:id', markFoundItemReturned); 

export default router;
