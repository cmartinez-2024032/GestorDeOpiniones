'use strict';

import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const postSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Types.ObjectId, ref: 'User', required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default model('Post', postSchema);

