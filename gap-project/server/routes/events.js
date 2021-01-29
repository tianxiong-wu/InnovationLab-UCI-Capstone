const router = require('express').Router();
const user = require('../models/patient.model');
let Event = require('../models/event.model');

router.route('/all/:userId').get((res, req) =>{
    const {userId} = req.params;

})

module.exports = router;