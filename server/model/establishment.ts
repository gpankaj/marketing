/**
 * Created by pg942665 on 5/4/2017.
 */

import {mymongoose} from "./model";
import * as mongoose from 'mongoose';

export const establishmentSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required: true
    },
    phone:String,
    photo: Buffer,

    mondayOpenTime:String,
    tuesdayOpenTime:String,
    wednesdayOpenTime:String,
    thrusdayOpenTime:String,
    fridayOpenTime:String,
    saturdayOpenTime:String,
    sundayOpenTime:String,

    forceOpen: Boolean,
    forceClose:Boolean,
    availableForChat:Boolean,

    comment: String,

    category: String,
    subCategory: String,
    keyword: [String],

    ownedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ownerSchema'
    }],

    createdAt: Date,

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ownerSchema'
    },
    active: Boolean,
    verified: Boolean,
    whatsapp: String,
    customerCommentAboutEstablishment: String,
    rating:String,
    comments: [String]

});

establishmentSchema.pre("save", function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

export const establishment = mymongoose.model('establishmentSchema',establishmentSchema);

/*
export function findEstablishmentById(id:any){
    return establishment.findById(id).exec();
}



export function findAllEstablishments(){
    return establishment.find({

    }).exec();
}*/