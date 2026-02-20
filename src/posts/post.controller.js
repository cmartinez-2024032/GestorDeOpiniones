'use strict';

import Post from './post.model.js';
import Comment from '../comments/coment.model.js';

export const createPost = async (req, res, next) => {
    try {
        const data = req.body;

        const post = await Post.create({
            ...data,
            author: req.userId,
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
        const posts = await Post.find({ isActive: true })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

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

        const post = await Post.findById(id)
            .populate('author', 'username email');

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

        const post = await Post.findById(id);

        if (!post || !post.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Post no encontrado',
            });
        }

        if (post.author.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'No puedes editar este post',
            });
        }

        Object.assign(post, req.body);
        await post.save();

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

        const post = await Post.findById(id);

        if (!post || !post.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Post no encontrado',
            });
        }

        if (post.author.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'No puedes eliminar este post',
            });
        }

        post.isActive = false;
        await post.save();

        await Comment.updateMany(
            { post: post._id },
            { isActive: false }
        );

        res.json({
            success: true,
            message: 'Post eliminado',
        });
    } catch (err) {
        next(err);
    }
};
