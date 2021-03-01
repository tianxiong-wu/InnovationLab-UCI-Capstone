const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// load user model
const User = require('./models');


module.exports = function(passport) {
    passport.use(
        
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //match user
            User.patient.findOne({email: email})
                .then(user => {
                    if (!user){
                        User.pharmacist.findOne({email: email}).then(user => {
                            if (!user){
                                User.admin.findOne({email: email}).then(user => {
                                    if (!user){
                                        return done(null, false, {message: 'That email is not registered'});
                                    }
                                    bcrypt.compare(password, user.password, (err, isMatch) =>{
                                        if (err) throw err;
                                        if (isMatch){
                                            return done(null, user);
                                        }else {
                                            return done(null, false, {message: 'password incorrect'});
                                        }
                                    })
                                })
                              
                            }
                            bcrypt.compare(password, user.password, (err, isMatch) =>{
                                if (err) throw err;
                                if (isMatch){
                                    return done(null, user);
                                }else {
                                    return done(null, false, {message: 'password incorrect'});
                                }
                            })
                        })
                
                    }

                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) =>{
                        if (err) throw err;
                        if (isMatch){
                            return done(null, user);
                        }else {
                            return done(null, false, {message: 'password incorrect'});
                        }
                    })
                })
                .catch(err => console.log(err));
        })
    );
    

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.patient.findbyId(id, (err, user) => {
            done(err, user);
        });
        User.pharmacist.findbyId(id, (err, user) => {
            done(err, user);
        });
        User.admin.findbyId(id, (err, user) => {
            done(err, user);
        });
    });
}