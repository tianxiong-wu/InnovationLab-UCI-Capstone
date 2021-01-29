const router = require('express').Router();
let FAQ = require('../models/FAQ.model');

router.route('/all').get((req, res) =>{
    FAQ.find()
        .then(faqs => res.json(faqs))
        .catch(err => res.status(500).json('Error: ' + err))
});

router.route('/add').post((req, res) =>{
    const question = req.body.question;
    const answer = req.body.answer;

    const newFAQ = new FAQ({
        question, 
        answer
    });

    newFAQ.save()
        .then(() => res.json(newFAQ))
        .catch(err => res.status(400).json('Error: ' + err))
        .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/delete/:id').post((req, res) =>{
    FAQ.findByIdAndDelete(req.params.id)
        .then(() => res.json('deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
});



module.exports = router;