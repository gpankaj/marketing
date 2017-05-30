/**
 * Created by pg942665 on 5/4/2017.
 */

import {Schema}  from 'mongoose';
import {mymongoose} from "./model";
const bcrypt = require('bcryptjs');

export const customerSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required: true
    },
    phone:String,
    preference:String,
    photo: Buffer,
    ownedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'ownerSchema'
    }],
    createdAt: Date,
    ownersCommentAboutACustomer: String,
    rating:String, //This will be kept as secret and hidden
    comments: [String] //This will be kept as secret and hidden
});

customerSchema.pre("save", function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

export const customer = mymongoose.model('customerSchema',customerSchema);