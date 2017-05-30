/**
 * Created by pg942665 on 5/4/2017.
 */

import {Schema,model}  from 'mongoose';

const bcrypt = require('bcryptjs');


export const ownerSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required: true
    },
    phone:[Number],
    token:String,
    profilePhoto: [Buffer],
    createdAt: Date,
    modifiedAt: Date,
    rating:String,
    comments:[String]
});


ownerSchema.pre("save", function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    this.modifiedAt = new Date();
    next();
});


export const owner = model('ownerSchema',ownerSchema);

export function findOwnerById(id:any){
    return owner.findById(id)
}



export function findAllOwners(){
    return owner.find({

    });
}