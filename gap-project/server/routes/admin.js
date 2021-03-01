const router = require('express').Router();
let Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.route('/register').post((req, res) =>{
    const firstName = req.body.firstName;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const pharmacists = req.body.pharmacists;
    const pharmacy = req.body.pharmacy;

    const newAdmin = new Admin({
        firstName,
        password,
        lastName,
        pharmacists,
        pharmacy
    });

    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newAdmin.password, salt, (err, hash) =>{
        if (err)
            console.log(err);
        //set password to hashed
        newAdmin.password = hash;
        console.log(newAdmin.password)
        //save
        newAdmin.save()
        .then(() => res.json(newAdmin))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
    }))
})

router.route('/login').post((req, res, next) => {
    passport.authenticate('local', (err, user, info) =>{
        if (err) throw err;
        //if (!user) {res.redirect('http://localhost:3000/login')}
        if (!user) { console.log('failture') }
        req.logIn(user, (err) =>{
            if (err){
                console.log('failture')
                return res.sendStatus(404);
            }else{
                return res.sendStatus(200)};
        })
    })(req, res, next);
})

router.route('/logout').get((req, res) => {
    req.logout();
})


module.exports = router;