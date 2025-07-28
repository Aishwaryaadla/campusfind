import mongoose from 'mongoose';
import Lostitem from '../models/lostitem.js';

// Update your getAllItems function
export const getAllItems = async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        
        const items = await Lostitem.find({
            name: { $regex: searchQuery, $options: 'i' }  // case-insensitive search on item name
        });

        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const addItem = async (req, res) => {
    
    const { name, description, dateLost, location, rollNo } = req.body;

    const image = req.file;

    const io = req.app.get('io');

    if (!name || !description || !dateLost || !location || !rollNo) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    try {
        const newitem = new Lostitem({
            name,
            description,
            dateLost,
            imageUrl: image ? `/uploads/${image.filename}` : null,
            location,
            rollNo,
        });
        
        await newitem.save();
        io.emit('new-lost-item', newitem);
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

export const getItemById = async (req, res) => {
    try {
      console.log("Fetching item with ID:", req.params.id);
  
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
      const item = await Lostitem.findById(req.params.id);
  
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.error("Error fetching item:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// Get all lost items reported by a specific user
export const getLostItemsByUser = async (req, res) => {
    try {
      const { rollNo } = req.params;
      const items = await Lostitem.find({ rollNo });
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching lost items by user:', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  