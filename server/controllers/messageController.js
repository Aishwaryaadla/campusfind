import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
    const { sender, receiver, itemId, itemType, content } = req.body;
  
    if (!sender || !receiver || !itemId || !itemType || !content) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
  
    try {
      const newMsg = new Message({ sender, receiver, itemId, itemType, content });
      await newMsg.save();
      res.status(201).json({ success: true, message: newMsg });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  export const getMessagesByItem = async (req, res) => {
    const { itemId } = req.params;
    try {
      const messages = await Message.find({ itemId }).sort({ timestamp: -1 });
      res.status(200).json({ success: true, messages });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  