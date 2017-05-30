/**
 * Created by pg942665 on 5/4/2017.
 */

import {Schema, model}  from 'mongoose';

const bcrypt = require('bcryptjs');


export const chatSchema = new Schema({
    message:{
        type:String
    },
    from:{
        type:String,
    },
    to:{
        type:String
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    },
    customer: {  //This field will be optional.
        type: Schema.Types.ObjectId,
        ref: 'customerSchema'
    },
    datetime:String,
    establishement: {
        type: Schema.Types.ObjectId,
        ref: 'establishmentSchema'
    },
});

export const chat = model('chatSchema',chatSchema);

