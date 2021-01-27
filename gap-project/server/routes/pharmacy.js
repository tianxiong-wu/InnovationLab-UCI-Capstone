const router = require('express').Router();
let Pharmacy = require('../models/pharmacy.model');

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const streetName = req.body.streetName;
    const city = req.body.city;
    const state = req.body.state;
    const zipCode = req.body.zipCode;
    const phone = req.body.phone;
    const email = req.body.email;

    const newPharmacy = new Pharmacy({
        name,
        streetName,
        city,
        state,
        zipCode,
        phone,
        email
    });

    newPharmacy.save()
        .then(() => res.json(newPharmacy))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));   
});

router.route('/updateInfo/:id').post((req, res) =>{
    Pharmacy.findByIdAndUpdate(req.params.id).then(pharmacy =>{
        pharmacy.name = req.body.name;
        pharmacy.streetName = req.body.streetName;
        pharmacy.city = req.body.city;
        pharmacy.state = req.body.state;
        pharmacy.zipCode = req.body.zipCode;
        pharmacy.phone = req.body.phone;
        pharmacy.email = req.body.email;


        pharmacy.save()
            .then(() => res.json(pharmacy))
            .catch(err => res.status(400).json('Error: ' + err))
            .catch(err => res.status(500).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(500).json('Error: ' + err));
})


module.exports = router;