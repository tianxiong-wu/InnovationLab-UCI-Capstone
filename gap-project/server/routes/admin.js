const router = require('express').Router();
let Admin = require('../models/admin.model');

//change
router.route('/register').post((req, res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const pharmacists = req.body.pharmacists;
    const pharmacy = req.body.pharmacy;

    const newAdmin = new Admin({
        firstName,
        lastName,
        pharmacists,
        pharmacy
    });

    newAdmin.save()
    .then(() => res.json(newAdmin))
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(500).json('Error: ' + err));
})

module.exports = router;