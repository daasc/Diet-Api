const { Router } = require("express");
const calendar = require('./calendar');
const user = require('./user');

const router = Router();

router.use('/calendar', calendar);
router.use('/user', user);

router.get('/', async (req, res) => {
    res.send('api running!'); 
});

module.exports = router; 