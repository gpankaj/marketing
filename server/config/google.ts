import {Passport} from "passport";
import {user} from "../model/user";
/**
 * Created by pg942665 on 5/17/2017.
 */

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcryptjs');

export function getGooglePassport (passport:Passport) {
    let mypassport = passport.use(new GoogleStrategy({
            clientID: '563959952938-v86511avmn9feuu4p79m3b4i0k7n1ngk.apps.googleusercontent.com',
            clientSecret: 'wmqAwM_s5W8vSBcd8NfVbQmN',
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken:String, refreshToken:String, profile:any, done:Function) {
            console.log("accessToken " ,accessToken , " refreshToken  " , refreshToken , " profile ", profile);
            user.findOne({ googleId: profile.id },
                function (err:Error, existingUser:any) {
                    if(err) {
                        console.log("GOT ERRR " , err);
                        return done(err);
                    }

                    //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                    if (!existingUser) {
                        console.log("User not found creating it");
                        {
                            bcrypt.genSalt(10, (err: any, salt: String) => {
                                bcrypt.hash(profile.id.toString(), salt, (err: any, hash: String) => {

                                        let newUser = new user({
                                            name: profile.displayName.toString(),
                                            email: profile.emails[0].value.toString(),
                                            provider: 'google',
                                            //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                                            googleId: profile.id.toString(),
                                            objectIdHash: hash
                                        });

                                        newUser.save((err: any, count: number) => {
                                            if (err) throw err;
                                            return done(null, existingUser)
                                        });
                                    }
                                )
                            });
                        }
                    }
                    else {

                        bcrypt.genSalt(10,(err:any,salt:String)=>{
                            if (err) throw err;
                            bcrypt.hash(profile.id.toString(), salt, (err:any,hash:String)=> {
                                if (err) throw err;
                                console.log("Hash is ", hash);
                                profile.password = hash;
                                existingUser.update({ googleId: profile.id },{objectIdHash:hash},(err:any, count:number)=>{
                                    if(err) throw err;
                                    console.log("Found an existing user - updated password" , existingUser , " Count " , count);
                                    return done(null, existingUser);
                                })

                            })
                        });
                    }
                });
        }

    ));

    mypassport.serializeUser(function(user:any, done:Function) {
        console.log('serializeUser: ' + user)
        done(null, user);
    });

    mypassport.deserializeUser(function(id:String, done:Function) {
        user.findById(id, function(err, user){
            console.log(user)
            if(!err) done(null, user);
            else done(err, {})
        })
    });

    return mypassport;
}