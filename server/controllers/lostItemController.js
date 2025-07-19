import mongoose from 'mongoose';
import Lostitem from '../models/lostitem.js';

export const getAllItems = async (req, res) => {
    try {
        const items = await Lostitem.find({});
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const addItem = async (req, res) => {
    
    const { name, description, dateLost } = req.body;

    const image = req.file;

    if (!name || !description || !dateLost || !image) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    try {
        const newitem = new Lostitem({
            name,
            description,
            dateLost,
            imageUrl: `/uploads/${image.filename}`
        });
        
        await newitem.save();
        res.status(201).json({ success: true, data: newitem });
    } catch (error) {
        
        res.status(500).json({ success: false, message: "Server error" });
        console.log("Error", error.message);
    }
};

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const item = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid item ID" });
    }

    try {
        const updateditem = await Lostitem.findByIdAndUpdate(id, item, { new: true });
        res.status(200).json({ success: true, data: updateditem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        await Lostitem.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Item deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Item not found" });
    }
};
