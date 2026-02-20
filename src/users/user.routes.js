'use strict';

import { Router } from 'express';
import {
    getProfile,
    updateProfile,
} from './user.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

router.get('/me', validateJWT, getProfile);
router.put('/me', validateJWT, updateProfile);

export default router;
