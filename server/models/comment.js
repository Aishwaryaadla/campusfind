// models/comment.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'itemType' },
  itemType: { type: String, enum: ['Lostitem', 'Founditem'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Comment', commentSchema);
