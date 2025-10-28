export const API_BASE_URL = import.meta.env.VITE_API_URL as string;

const googleOauthBaseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
const googleOauthParams = [
  "scope=openid email profile https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read",
  "access_type=offline",
  "prompt=consent",
  "include_granted_scopes=true",
  "response_type=code",
  `client_id=${googleClientId}`,
  `redirect_uri=${API_BASE_URL}/v1/auth/google`
];

export const googleOauthUrl = `${googleOauthBaseUrl}?${googleOauthParams.join('&')}`;
