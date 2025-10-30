var express = require('express');
const { completeOnboarding, sendPhoneOtp, verifyPhoneOtp } = require('../controller/auth');
var router = express.Router();

router.post('/complete-onboarding', completeOnboarding);
router.post('/send-phone-otp', sendPhoneOtp);
router.post('/verify-phone-otp', verifyPhoneOtp);

module.exports = router;
