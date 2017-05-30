/**
 * Created by pg942665 on 5/26/2017.
 */
/**
 * Created by pg942665 on 5/4/2017.
 */

import {model,  Schema} from "mongoose";
const bcrypt = require('bcryptjs');
import * as mongoose from 'mongoose';

export const botRuleSchema = new Schema({
    pattern:{
        type:String,
        required: true
    },
    condition:{
        type:String
    },
    textResult: {
        type:String
    },
    pictureResult: {
        type: Buffer
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

botRuleSchema.pre("save", function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

export const BotRule = model('botRuleSchema',botRuleSchema);
