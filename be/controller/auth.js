const axios = require('axios');
const querystring = require('querystring');

let users = [];
let otpStore = {}; // In-memory store for OTPs

exports.googleAuthRedirect = (req, res) => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['openid', 'profile', 'email'].join(' '),
  };
  const qs = new URLSearchParams(options);
  res.redirect(`${rootUrl}?${qs.toString()}`);
};

exports.googleAuthCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code provided');

  try {
    // Exchange code for tokens
    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      querystring.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const { id_token, access_token } = tokenRes.data;

    // Get user info
    const userRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const user = userRes.data;

    const userIndex = users.findIndex((u) => u.email === user.email);
    if (userIndex === -1) {
      users.push(user);
    } else {
      user.onboarded = !!users[userIndex]?.onboarded;
    }

    res.redirect(
      process.env.FRONTEND_URL + `/#/onboarding?user=${JSON.stringify(user)}&id_token=${id_token}`
    );
  } catch (err) {
    res.status(500).json({ error: 'Failed to authenticate with Google', details: err.message });
  }
};

exports.completeOnboarding = (req, res) => {
  const email = req.user?.email;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const onboardingData = req.body;
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users[userIndex] = { ...users[userIndex], ...onboardingData, onboarded: true };

  res.json({ message: 'Onboarding completed' });
};

exports.sendPhoneOtp = (req, res) => {
  const { phoneNumber, phoneCode } = req.body;
  if (!phoneNumber || !phoneCode) {
    return res.status(400).json({ error: 'Phone number and code are required' });
  }

  // Mock OTP generation and sending
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Sending OTP ${otp} to ${phoneCode}${phoneNumber}`);
  otpStore[phoneNumber] = otp; // Store OTP for verification later

  res.json({ message: 'OTP sent successfully' });
};

exports.verifyPhoneOtp = (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: 'Phone number and OTP are required' });
  }

  const storedOtp = otpStore[phoneNumber];
  if (storedOtp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  // OTP is valid, proceed with verification
  delete otpStore[phoneNumber];
  res.json({ message: 'Phone number verified successfully' });
};
