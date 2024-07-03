import axios from 'axios';

const UPS_AUTH_URL = 'https://wwwcie.ups.com/security/v1/oauth/token';
const UPS_API_URL = 'https://onlinetools.ups.com/track/v1/details';
const UPS_CLIENT_ID = process.env.UPS_CLIENT_ID as string;
const UPS_CLIENT_SECRET = process.env.UPS_CLIENT_SECRET as string;

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

const getAccessToken = async (): Promise<string> => {
  if (accessToken && tokenExpiry && tokenExpiry > Date.now()) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      UPS_AUTH_URL,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${UPS_CLIENT_ID}:${UPS_CLIENT_SECRET}`).toString('base64')}`
        }
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;

    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to fetch access token');
  }
};

export const getTrackingDetails = async (trackingNumber: string): Promise<any> => {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      UPS_API_URL,
      { TrackingNumber: trackingNumber },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching tracking details:', error);
    throw new Error('Failed to fetch tracking details');
  }
};