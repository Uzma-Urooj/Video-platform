import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
  subscribe
} from '../controllers/user.controllers.js';

import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getUser);
router.put('/subscribe', auth, subscribe);
router.post("/logout", auth, logout);

export default router;

