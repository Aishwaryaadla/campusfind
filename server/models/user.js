import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  branch: {
    type: String,
    required: true
  },

  year: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th'],
    required: true
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
