import {user} from "../model/user";
import {Passport} from "passport";
/**
 * Created by pg942665 on 5/17/2017.
 */


export function getJwtPassport(passport:Passport){

    console.log("Inside getJwtPassport ");

    const JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;

    //below is a temporary object, just to supress IDE error - compilation does not error this.
    let opts = {"secretOrKey":'', "jwtFromRequest":''};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader(),
    opts.secretOrKey = 'secret';

    passport.use(new JwtStrategy(opts, (jwt_payload:any, done:Function)=>{

        console.log("Payload ", jwt_payload);

        user.findById(jwt_payload._doc._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                console.log("User is " , user);
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}
