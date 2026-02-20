'use strict';

import Comment from './coment.model.js';

export const createComment = async (req, res, next) => {
    try {
        const data = req.body;

        const comment = new Comment({
            content: data.content,
            user: req.userId,
            post: data.post,
        });

        await comment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario creado',
            comment,
        });
    } catch (err) {
        next(err);
    }
};

export const getCommentsByPost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({
            post: postId,
            status: true,
        })
            .populate('user', 'name username')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            comments,
        });
    } catch (err) {
        next(err);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const comment = await Comment.findOne({
            _id: id,
            user: req.userId,
            status: true,
        });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado',
            });
        }

        comment.content = data.content ?? comment.content;

        await comment.save();

        res.json({
            success: true,
            message: 'Comentario actualizado',
            comment,
        });
    } catch (err) {
        next(err);
    }
};


export const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findOne({
            _id: id,
            user: req.userId,
            status: true,
        });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado',
            });
        }

        comment.status = false;
        await comment.save();

        res.json({
            success: true,
            message: 'Comentario eliminado',
        });
    } catch (err) {
        next(err);
    }
};
