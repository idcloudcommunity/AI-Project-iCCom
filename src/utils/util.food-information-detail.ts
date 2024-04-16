import { Request, Response } from 'express';
import axios from 'axios';
import { PORT } from '../helpers/helper.environment';

// FatSecret OAuth credentials
const clientId = '1ccbd217f01247ea8b0ae31034b30954';
const clientSecret = 'd68042210e1f4ee0b23bebafe56c6505';
const redirectUri = `http://127.0.0.1:${PORT}/callback`;

// Define route handler for initiating OAuth flow
const utilFoodInformationDetail = {
    doAuth: (_: Request, response: Response) => {
        // Redirect the user to the authorization URL
        const authorizationUrl = `https://www.fatsecret.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
        response.redirect(authorizationUrl);
    },
    callback: async (request: Request, response: Response) => {
        const  code  = request.query.code?.toString() || '';
        try {
            // Exchange authorization code for access token
            const params = new URLSearchParams();
            params.append('client_id', clientId);
            params.append('client_secret', clientSecret);
            params.append('code', code);
            params.append('redirect_uri', redirectUri);
            params.append('grant_type', 'authorization_code');
    
            const result = await axios.post('https://www.fatsecret.com/oauth/access_token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
            // Extract access token from response
            const accessToken = result.data.access_token;
    
            // Now you can use this accessToken in your API requests
            console.log('Access Token:', accessToken);
            response.send('Access Token Obtained');
        } catch (error: any) {
            console.error('Error:', error.response?.data || error.message);
            response.status(500).json({ error: 'Failed to obtain access token' });
        }
    }
}

export default utilFoodInformationDetail;
