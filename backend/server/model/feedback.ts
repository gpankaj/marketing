/**
 * Created by pg942665 on 5/26/2017.
 */

/**
 * Created by pg942665 on 5/4/2017.
 */

import {model, Schema} from "mongoose";
import * as mongoose from "mongoose";
const bcrypt = require('bcryptjs');

export const feedbackSchema = new Schema({
    text: {
        type:String
    },
    rating: {
        type: Number
    },
    author: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema'
    },
    bot:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'botSchema'
    },
    createdAt: Date,
    active: Boolean
});

feedbackSchema.pre("save", function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

export const Feedback = model('feedbackSchema',feedbackSchema);
