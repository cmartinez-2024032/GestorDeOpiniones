'use strict';

import { Router } from 'express';
import {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment,
} from './coment.controller.js';

import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();


router.post('/', validateJWT, createComment);


router.get('/post/:postId', getCommentsByPost);


router.put('/:id', validateJWT, updateComment);


router.delete('/:id', validateJWT, deleteComment);

export default router;
