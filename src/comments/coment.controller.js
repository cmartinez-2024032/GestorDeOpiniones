'use strict';

import Comment from './coment.model.js';
import User from '../users/user.model.js';

export const createComment = async (req, res, next) => {
    try {
        const data = req.body;


        const comment = await Comment.create({
            content: data.content,
            userId: req.userId,
            postId: data.postId,
            status: true
        });

        res.status(201).json({
            success: true,
            message: 'Comentario creado',
            comment
        });
    } catch (err) {
        next(err);
    }
};

export const getCommentsByPost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: {
                postId: postId,
                status: true
            },
            include: [
                {
                    model: User,
                    attributes: ['name', 'username']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            comments
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
            where: {
                id: id,
                userId: req.userId,
                status: true
            }
        });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        await comment.update({
            content: data.content ?? comment.content
        });

        res.json({
            success: true,
            message: 'Comentario actualizado',
            comment
        });
    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findOne({
            where: {
                id: id,
                userId: req.userId,
                status: true
            }
        });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        await comment.update({ status: false });

        res.json({
            success: true,
            message: 'Comentario eliminado'
        });
    } catch (err) {
        next(err);
    }
};
