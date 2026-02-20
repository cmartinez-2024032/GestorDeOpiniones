'use strict';

import { Router } from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} from './post.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);

router.post('/', validateJWT, createPost);
router.put('/:id', validateJWT, updatePost);
router.delete('/:id', validateJWT, deletePost);

export default router;
