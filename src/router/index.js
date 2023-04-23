const { Router } = require("express");
const authorizer = require('../middleware/authorize');

const calendar = require('./calendar');
const user = require('./user');

const router = Router();

router.use('/api/calendar', authorizer, calendar);
router.use('/api/user', user);

router.get('/', async (req, res) => {
    res.send('api running!'); 
});

module.exports = router; 