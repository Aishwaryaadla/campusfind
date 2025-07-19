import mongoose from 'mongoose';
import Founditem from '../models/founditem.js';

export const getAllFoundItems = async (req, res) => {
    try {
        const items = await Founditem.find({});
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const addFoundItem = async (req, res) => {
    const { name, description, dateFound } = req.body;
    const image = req.file;

    if (!name || !description || !dateFound || !image) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    try {
        const newItem = new Founditem({
            name,
            description,
            dateFound,
            imageUrl: `/uploads/${image.filename}`
        });
        await newItem.save();
        res.status(201).json({ success: true, data: newItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateFoundItem = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid item ID" });
    }

    try {
        const updated = await Founditem.findByIdAndUpdate(id, update, { new: true });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteFoundItem = async (req, res) => {
    const { id } = req.params;

    try {
        await Founditem.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Item deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Item not found" });
    }
};
