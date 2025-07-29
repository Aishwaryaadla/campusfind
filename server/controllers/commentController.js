// controllers/commentController.js
import Comment from '../models/comment.js';

export const getCommentsByItem = async (req, res) => {
  try {
    const comments = await Comment.find({ itemId: req.params.itemId }).populate('user', 'name rollNo');
    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
};

export const createComment = async (req, res) => {
  try {
    const { itemId, itemType, content } = req.body;

    const comment = new Comment({
      itemId,
      itemType,
      content,
      user: req.user._id, // ✅ use from token, not frontend
    });

    await comment.save();
    await comment.populate('user', 'name'); // populate only name

    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment' });
  }
};