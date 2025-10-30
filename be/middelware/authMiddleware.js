// Middleware to validate Bearer token in Authorization header
const axios = require('axios');

async function verifyGoogleToken(idToken) {
  const { data } = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
  if (data.aud !== process.env.GOOGLE_CLIENT_ID) {
    throw new Error('Token audience mismatch');
  }
  return data;
}

module.exports = async function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No or invalid Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing from Authorization header' });
  }
  try {
    const payload = await verifyGoogleToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token', details: err.message });
  }
};
