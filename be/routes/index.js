var express = require('express');
var router = express.Router();
const authController = require('../controller/auth');

// Google OAuth endpoints
router.get('/auth/google', authController.googleAuthRedirect);
router.get('/auth/google/callback', authController.googleAuthCallback);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
