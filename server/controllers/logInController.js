import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';


const logInController = async (req, res) => {
    try {
      const { rollNo, password } = req.body;
  
      const user = await User.findOne({ rollNo });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '2d',
      });


      res.status(200).json({ message: 'Login successful',token, user: { name: user.name, rollNo: user.rollNo, token: token } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export default logInController
