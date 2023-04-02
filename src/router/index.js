const { Router } = require("express");
const calendar = require('./calendar');

const router = Router();

router.use('/calendar', calendar);
router.get('/', async (req, res) => {
    res.send('api running!'); 
});

module.exports = router; 