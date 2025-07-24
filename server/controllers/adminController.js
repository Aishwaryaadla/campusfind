import bcrypt from 'bcryptjs';

const ADMIN_ID = '066'; // replace with your fixed adminId
const ADMIN_PLAIN_PASSWORD = 'admin@007'; // replace with your real admin password

// Pre-hash once and store only the hashed version in production
const ADMIN_HASHED_PASSWORD = await bcrypt.hash(ADMIN_PLAIN_PASSWORD, 10);

const loginAdminController = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    if (adminId !== ADMIN_ID) {
      return res.status(401).json({ message: 'Invalid Admin ID' });
    }

    const isMatch = await bcrypt.compare(password, ADMIN_HASHED_PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Admin login successful',
      user: {
        name: 'Admin',
        rollNo: adminId,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default loginAdminController;
