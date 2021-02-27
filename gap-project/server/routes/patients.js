const router = require('express').Router();
let Patient = require('../models/patient.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');



//get all users in database
router.route('/all').get((req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(500).json('Error: ' + err));
});

//find user by ID
router.route('/:id').get((req, res) =>{
    Patient.findById(req.params.id)
        .then(patient => res.json(patient))
        .catch(err => res.status(500).json('Error: ' + err));
});

// archieved 
/*//find users by role [patient, admin, pharmacist, intake]
router.route('/all/:role').get((req, res) =>{
    User.find().where('role').equals(req.params.role.toLowerCase())
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});*/

// get user's infusion list via id
router.route('/infusion/:id').get((req, res) => {
    Patient.findById(req.params.id).where('infusionArray')
        .then(patient => res.json(patient.infusionArray))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});

// get user's notification list via id
router.route('/notification/:id').get((req, res) => {
    Patient.findById(req.params.id).where('notification')
        .then(patient => res.json(patient.notification))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});

// get user's pharmacist
router.route('/assignedPharmacist/:id').get((req, res) =>{
    Patient.findById(req.params.id).where('assignedPharmacist')
        .then(patient => res.json(patient.assignedPharmacist))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});

//delete a user
router.route('/delete/:id').post((req, res) =>{
    Patient.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// ! - NEED TO REUPLOAD SAME DATA FROM FRONTEND
// update user info
// OVERRIDE OTHER FIELDS IF LEFT EMPTY
// WILL NOT THROW ERROR & UPDATE IF YOU TRY TO CHANGE OTHER FIELDS
router.route('/updateInfo/:id').post((req, res) =>{
    Patient.findByIdAndUpdate(req.params.id).then(patient =>{
        patient.phoneNumber = req.body.phoneNumber;
        patient.email = req.body.email;
        patient.birthday = req.body.birthday;

        patient.save()
            .then(() => res.json(patient))
            .catch(err => res.status(400).json('Error: ' + err))
            .catch(err => res.status(500).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(500).json('Error: ' + err));
});

// ! - NEED TO REUPLOAD SAME DATA FROM FRONTEND
// update user infusion info
router.route('/updateInfusion/:id').post((req, res) =>{
    Patient.findByIdAndUpdate(req.params.id).then(patient =>{
        patient.infusionArray = req.body.infusionArray;

        patient.save()
            .then(() => res.json(patient))
            .catch(err => res.status(400).json('Error: ' + err))
            .catch(err => res.status(500).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(500).json('Error: ' + err));
});

// update user notification 
router.route('/updateNotification/:id').post((req, res) =>{
    Patient.findByIdAndUpdate(req.params.id).then(patient => {
        patient.notification = req.body.notification;
        patient.save()
            .then(() => res.json(patient))
            .catch(err => res.status(400).json('Error: ' + err))
            .catch(err => res.status(500).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(500).json('Error: ' + err));
});
// update next check in 
router.route('/updateCheckin/:id').post((req, res) =>{
    Patient.findByIdAndUpdate(req.params.id).then(patient => {
        patient.nextCheckin = req.body.nextCheckin;
        patient.save()
            .then(() => res.json(patient))
            .catch(err => res.status(400).json('Error: ' + err))
            .catch(err => res.status(500).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/updateRecentCheckin/:id').post((req, res) =>{
    Patient.findByIdAndUpdate(req.params.id).then(patient => {
        patient.recentCheckIn = req.body.recentCheckIn;
        patient.save()
            .then(() => res.json(patient))
            .catch(err => res.status(400).json('Error: ' + err))
            .catch(err => res.status(500).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(500).json('Error: ' + err));
});
router.route('/register').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const birthday = Date.parse(req.body.birthday);
    const gender = req.body.gender;
    const role = req.body.role;

    


    const newPatient = new Patient({
        firstName,
        lastName,
        phoneNumber,
        password,
        email,
        birthday,
        role,
        gender,
    });

    //hash password
    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newPatient.password, salt, (err, hash) =>{
        if (err)
            console.log(err);
        //set password to hashed
        newPatient.password = hash;
        console.log(newPatient.password)
        //save
        newPatient.save()
        .then(() => res.json(newPatient))
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
                res.send(req.user);
                console.log(req.user)
                };
        })
    })(req, res, next);
})

router.route('/logout').get((req, res) => {
    req.logout();
})

module.exports = router;