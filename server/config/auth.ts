import {user} from "../model/user";
/**
 * Created by pg942665 on 5/10/2017.
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


export const mypassport = passport.use(new GoogleStrategy({
        clientID: '563959952938-v86511avmn9feuu4p79m3b4i0k7n1ngk.apps.googleusercontent.com',
        clientSecret: 'wmqAwM_s5W8vSBcd8NfVbQmN',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken:String, refreshToken:String, profile:any, done:any) {
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
                    let newUser = new user({
                        name: profile.displayName.toString(),
                        email: profile.emails[0].value.toString(),
                        provider: 'google',
                        //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                        googleId: profile.id.toString()
                    });
                    newUser.save(function(err:any) {
                        if (err) console.log(err);
                        console.log("New user created successfully " , newUser);
                        return done(err, user);
                    });
                } else {
                    //found user. Return
                    console.log("Found an existing user " , existingUser);
                    return done(err, existingUser);
                }
            });
    }

));