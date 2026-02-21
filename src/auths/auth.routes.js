'use strict';

import { Router } from 'express';
import { register, login, verifyEmail } from './auth.controller.js';
import { validateRegister, validateLogin } from '../../middlewares/validation.js';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/verify-email', verifyEmail);

export default router;