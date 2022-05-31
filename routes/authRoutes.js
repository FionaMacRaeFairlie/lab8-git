const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');

router.post('/login', auth.login);

// router.post('/login',function(req, res) {
//          res.send('post login page');
//      })
    
router.get('/logout', auth.logout);

module.exports = router;

