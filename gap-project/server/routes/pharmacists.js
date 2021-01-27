const router = require('express').Router();
let Pharmacist = require('../models/pharmacist.model');

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

// get patient list
router.route('/assignedPatient/:id').get((req, res) =>{
    Pharmacist.findById(req.params.id).where('assignedPatient')
        .then(pharmacist => res.json(pharmacist.assignedPatient))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});

//add pharmacist
router.route('/register').post((req, res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const birthday = Date.parse(req.body.birthday);
    const assignedPatient = req.body.assignedPatient;
    const role = req.body.role;

    const newPharmacist = new Pharmacist({
        firstName,
        lastName,
        phoneNumber,
        email,
        birthday,
        assignedPatient,
        role
    });

    newPharmacist.save()
        .then(() => res.json(newPharmacist))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});
module.exports = router;