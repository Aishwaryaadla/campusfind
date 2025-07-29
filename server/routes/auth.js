
import express from 'express';
import logInController from '../controllers/logInController.js';
import signUpController from '../controllers/signUpController.js';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/login', logInController);

export default router;
