const router = require('express').Router();
let Pharmacist = require('../models/pharmacist.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//get all pharmacist
router.route('/all').get((req, res) =>{
    Pharmacist.find()
        .then(pharmacists => res.json(pharmacists))
        .catch(err => res.status(500).json('Error: ' + err));
});

//get pharmacist via id
router.route('/:id').get((req, res) => {
    Pharmacist.findById(req.params.id)
        .then(pharmacist => res.json(pharmacist))
        .catch(err => res.status(500).json('Error: ' + err));
});

// get a patient via id
router.route('/assignedPatient/:id').get((req, res) =>{
    Pharmacist.findById(req.params.id).where('assignedPatient')
        .then(pharmacist => res.json(pharmacist.assignedPatient))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});

//add pharmacist 
// change
router.route('/register').post((req, res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const birthday = Date.parse(req.body.birthday);
    const assignedPatient = req.body.assignedPatient;
    const role = req.body.role;

    const newPharmacist = new Pharmacist({
        firstName,
        lastName,
        password,
        phoneNumber,
        email,
        birthday,
        assignedPatient,
        role
    });

    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newPharmacist.password, salt, (err, hash) =>{
        if (err)
            console.log(err);
        //set password to hashed
        newPharmacist.password = hash;
        console.log(newPharmacist.password)
        //save
        newPharmacist.save()
        .then(() => res.json(newPharmacist))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
    }))



});

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