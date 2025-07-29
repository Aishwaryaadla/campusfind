
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const signUpController = async (req, res) => {
    try {
      const { name, rollNo, password, branch, year,role } = req.body;
  
      const existingUser = await User.findOne({ rollNo });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this Roll Number' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        rollNo,
        password: hashedPassword,
        branch,
        year,
        role,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export default signUpController
