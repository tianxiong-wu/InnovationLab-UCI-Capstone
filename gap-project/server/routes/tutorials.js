const router = require('express').Router();
let Tutorial = require('../models/tutorial.model');

router.route('/all').get((req, res) =>{
    Tutorial.find()
            .then(tutorials => res.json(tutorials))
            .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const name = req.body.name;
    const description = req.body.name;
    const url = req.body.url;

    const newTutorial = new Tutorial({
        name,
        description,
        url,
    });

    newTutorial.save()
               .then(() => res.json(newTutorial))
               .catch(err => res.status(400).json('Error: ' + err))
               .catch(err => res.status(500).json('Error: ' + err));
})

module.exports = router;