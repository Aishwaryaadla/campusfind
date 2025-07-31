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
    const { name, description, dateFound, location , rollNo } = req.body;
    const image = req.file;

    if (!name || !description || !dateFound || !image || !location || !rollNo) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    try {
        const newItem = new Founditem({
            name,
            description,
            dateFound,
            imageUrl: `/uploads/${image.filename}`,
            location,
            rollNo
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


export const getItemById = async (req, res) => {
    try {
  
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
      const item = await Founditem.findById(req.params.id);
  
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.error("Error fetching item:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const getFoundItemsByUser = async (req, res) => {
    try {
      const { rollNo } = req.params;
      const items = await Founditem.find({ rollNo });
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching found items by user:', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  export const markFoundItemReturned = async (req, res) => {
    try {
      const updated = await Founditem.findByIdAndUpdate(
        req.params.id,
        { status: 'Returned' },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  