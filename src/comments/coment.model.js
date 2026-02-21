'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.js';


const Comment = sequelize.define(
    'Comment',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        content: {
            type: DataTypes.STRING,
            allowNull: false
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id'
        },

        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'post_id'
        },

        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        tableName: 'comments'
    }
);

export default Comment;
