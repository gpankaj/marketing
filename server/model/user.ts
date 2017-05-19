/**
 * Created by pg942665 on 5/10/2017.
 */

import {Schema,model}  from 'mongoose';
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

export const userSchame = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required: true
    },
    provider:String,
    googleId:String,

    objectIdHash: String,

    passwordHash:String,

    accessToken:String,
    refreshToken:String,
    phone:[Number],
    token:String,
    profilePhoto: [Buffer],
    createdAt: Date,
    modifiedAt: Date,
    authenticateUsing : [String], //User can authenticate using jwt, google, facebook
    type: String //Weather this user is customer, owner or both.

});


userSchame.pre("save", function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    this.modifiedAt = new Date();
    next();
});


export const user = model('userSchema',userSchame);


export const hashPassword = function hashPassword(password_Or_id: String, callback:Function){
    bcrypt.genSalt(10,(err:any,salt:String)=>{
        if(err) throw err;
        bcrypt.hash(password_Or_id,salt, (err:any,hash:String)=> {
            if(err) throw err;

            callback(null,hash)
        })
    })
};
