'use strict';

import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const commentSchema = new Schema(
    {
        content: { type: String, required: true },
        user: { type: Types.ObjectId, ref: 'User', required: true },
        post: { type: Types.ObjectId, ref: 'Post', required: true },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default model('Comment', commentSchema);

