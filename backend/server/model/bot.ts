/**
 * Created by pg942665 on 5/4/2017.
 */

import {model, Schema} from "mongoose";
import * as mongoose from "mongoose";
const bcrypt = require('bcryptjs');

export const botSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:String
    },
    subCategory:{
      type:String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema'
    },
    maintainers: [{
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
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

export const Bot = model('botSchema',botSchema);
