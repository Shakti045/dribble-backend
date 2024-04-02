import express from 'express';
import { signin } from '../controllers/signin.js';
import { signup } from '../controllers/signup.js';
import { verifymail } from '../controllers/verifymail.js';
import { update } from '../controllers/update.js';
import { auth } from '../middleware/authentication.js';
import { getProfile } from '../controllers/profile.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/verifymail', verifymail);
router.post('/update',auth , update);
router.get('/getProfile',auth , getProfile);

export default router;