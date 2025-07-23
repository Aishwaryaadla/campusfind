
import User from '../models/user.js';
import bcrypt from 'bcryptjs';


const logInController = async (req, res) => {
    try {
      const { rollNo, password } = req.body;
  
      // Find user by roll number
      const user = await User.findOne({ rollNo });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful', user: { name: user.name, rollNo: user.rollNo } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export default logInController
