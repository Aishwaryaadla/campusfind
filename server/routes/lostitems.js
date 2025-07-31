import express from 'express';
import {
    getAllItems,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    getLostItemsByUser,
    markItemReturned
} from '../controllers/lostItemController.js';

import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllItems);
router.get('/user/:rollNo', getLostItemsByUser);
router.get('/:id', getItemById);
router.post('/', upload.single('image'), addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

router.put('/return/:id', markItemReturned); 

export default router;
