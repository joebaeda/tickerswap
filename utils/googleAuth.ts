import { google } from 'googleapis';

export function getGoogleAuth() {
  const decodedKey = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!, 'base64').toString('utf8');
  const key = JSON.parse(decodedKey);

  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth;
}