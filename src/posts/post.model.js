'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.js';
import User from '../users/user.model.js';

export const Post = sequelize.define(
    'Post',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },

        authorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'NO ACTION',
        },
    },
    {
        tableName: 'posts',
    }
);

Post.belongsTo(User, { foreignKey: 'authorId' });
User.hasMany(Post, { foreignKey: 'authorId' });
