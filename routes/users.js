var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
// move this to user contorller
router.get('/signup', userController.signup_get);
router.post('/signup', userController.signup_post)




module.exports = router;
