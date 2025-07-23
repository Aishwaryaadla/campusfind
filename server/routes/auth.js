
import express from 'express';
import logInController from '../controllers/logInController.js';
import signUpController from '../controllers/signUpController.js';



const router = express.Router();

// Register
// router.post('/signup', async (req, res) => {
//     console.log("Received signup request");
//   try {
//     console.log("Request body:", req.body); 
//     const { name, rollNo, password, branch, year } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ rollNumber: rollNo });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       name,
//       rollNumber,
//       password: hashedPassword,
//       branch,
//       year,
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/signup', signUpController);
router.post('/login', logInController);

export default router;
