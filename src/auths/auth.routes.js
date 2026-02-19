'use strict';

import { Router } from 'express';
import { register, login } from './auth.controller.js';
import { validateRegister, validateLogin } from '../../middlewares/validation.js';

const router = Router();

router.post('/register', validateRegister, register);


router.post('/login', validateLogin, login);

export default router;
