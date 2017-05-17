/**
 * Created by pg942665 on 5/4/2017.
 */

import {model, Schema} from "mongoose";
const bcrypt = require('bcryptjs');

export const botSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    pattern:[{
        type:String,
        required: true
    }],
    condition:[{
        type:String
    }],
    result1: [{
        type:String
    }],
    result2: [{
        type: Buffer
    }],
    establishement: {
        type: Schema.Types.ObjectId,
        ref: 'establishmentSchema'
    },
    createdAt: Date,
    active: Boolean
});

botSchema.pre("save", function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

export const bot = model('botSchema',botSchema);
