'use strict';

import { Post } from './post.model.js';
import Comment from '../comments/coment.model.js';
import User from '../users/user.model.js';
export const createPost = async (req, res, next) => {
    try {
        const data = req.body;

        const post = await Post.create({
            ...data,
            authorId: req.userId,
        });

        res.status(201).json({
            success: true,
            message: 'Post creado',
            post,
        });
    } catch (err) {
        next(err);
    }
};

export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: { isActive: true },
            include: {
                model: User,
                attributes: ['id', 'username', 'email'],
            },
            order: [['createdAt', 'DESC']],
        });

        res.json({
            success: true,
            posts,
        });
    } catch (err) {
        next(err);
    }
};

export const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id, {
            include: {
                model: User,
                attributes: ['id', 'username', 'email'],
            },
        });

        if (!post || !post.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Post no encontrado',
            });
        }

        res.json({
            success: true,
            post,
        });
    } catch (err) {
        next(err);
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id);

        if (!post || !post.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Post no encontrado',
            });
        }

        if (post.authorId !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'No puedes editar este post',
            });
        }

        await post.update(req.body);

        res.json({
            success: true,
            message: 'Post actualizado',
            post,
        });
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id);

        if (!post || !post.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Post no encontrado',
            });
        }

        if (post.authorId !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'No puedes eliminar este post',
            });
        }

        await post.update({ isActive: false });

        await Comment.update(
            { isActive: false },
            { where: { postId: id } }
        );

        res.json({
            success: true,
            message: 'Post eliminado',
        });
    } catch (err) {
        next(err);
    }
};
