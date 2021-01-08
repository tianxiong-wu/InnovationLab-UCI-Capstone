const router = require('express').Router();
let User = require('../models/user.model');

//get all users in database
router.route('/all').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json('Error: ' + err));
});

//find user by ID
router.route('/:id').get((req, res) =>{
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json('Error: ' + err));
});

//find users by role [patient, admin, pharmacist, intake]
router.route('/all/:role').get((req, res) =>{
    User.find().where('role').equals(req.params.role.toLowerCase())
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});

//delete a user
router.route('/delete/:id').post((req, res) =>{
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// ! - NEED TO REUPLOAD SAME DATA FROM FRONTEND
// update user info
// OVERRIDE OTHER FIELDS IF LEFT EMPTY
// WILL NOT THROW ERROR & UPDATE IF YOU TRY TO CHANGE OTHER FIELDS
router.route('/updateInfo/:id').post((req, res) =>{
    User.findByIdAndUpdate(req.params.id).then(user =>{
        user.phoneNumber = req.body.phoneNumber;
        user.email = req.body.email;
        user.birthday = req.body.birthday;

        user.save()
            .then(() => res.json(user))
            .catch(err => res.status(400).json('Error: ' + err))
            .catch(err => res.status(500).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(500).json('Error: ' + err));
});

// ! - NEED TO REUPLOAD SAME DATA FROM FRONTEND
// update user infusion info
// OVERRIDE OTHER FIELDS IF LEFT EMPTY
// WILL NOT THROW ERROR & UPDATE IF YOU TRY TO CHANGE OTHER FIELDS
router.route('/updateInfusion/:id').post((req, res) =>{
    User.findByIdAndUpdate(req.params.id).then(user =>{
        user.checkinList = req.body.checkinList;
        user.infusionType = req.body.infusionType;
        user.notification = req.body.notification;

        user.save()
            .then(() => res.json(user))
            .catch(err => res.status(400).json('Error: ' + err))
            .catch(err => res.status(500).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(500).json('Error: ' + err));
});

//TODO: need to match with registration info and auth API
//code below for testing
router.route('/register').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const birthday = Date.parse(req.body.birthday);
    const role = req.body.role.toLowerCase();
    const checkinList = [];
    const infusionType = [];
    const notification = [];
    
    // TODO: add validation 

    const newUser = new User({
        firstName,
        lastName,
        phoneNumber,
        email,
        birthday,
        role,
        checkinList,
        infusionType,
        notification});
   

    newUser.save()
        .then(() => res.json(newUser))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});

module.exports = router;