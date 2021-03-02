const router = require('express').Router();

let Event = require('../models/event.model');

router.route('/all').get((req, res) =>{
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(500).json('Error: ' + err));

})

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const start = Date.parse(req.body.start);
    const end = Date.parse(req.body.end);
    const notifyAt = Date.parse(req.body.notifyAt);
    const description = req.body.description;

    const newEvent = new Event ({
        title, 
        start, 
        end, 
        notifyAt, 
        description
    });

    newEvent.save()
        .then(() => res.json(newEvent))
            .catch(err => res.status(400).json('Error: ' + err))
            .catch(err => res.status(500).json('Error: ' + err));

})
router.route('/delete/:id').post((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err))
})

module.exports = router;