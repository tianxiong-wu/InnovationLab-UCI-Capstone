const router = require('express').Router();

let Notification = require('../models/notification.model');


router.route('/all').get((req, res) =>{
    Notification.find()
        .then(notifications => res.json(notifications))
        .catch(err => res.status(500).json('Error: ' + err));

})

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    const newNotification = new Notification ({
        title, description
    });

    newNotification.save()
        .then(() => res.json(newNotification))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));

})

router.route('/delete/:id').post((req, res) => {
    Notification.findByIdAndDelete(req.params.id)
        .then(() => res.json('deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err))
})

module.exports = router;