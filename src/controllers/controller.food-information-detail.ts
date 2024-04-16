import { Request, Response, } from 'express';
import axios from 'axios';

//util export
import utilFoodInformationDetail from '../utils/util.food-information-detail';

const controllerFoodInformationDetail = {
    getFoodInformationDetail: async (request: Request, response: Response) => {
        try {
            // Assuming you have the access token stored in a variable
            const accessToken = 'YOUR_ACCESS_TOKEN';
    
            // Make the request to the API
            const result = await axios.post(
                'https://platform.fatsecret.com/rest/server.api',
                {
                    method: 'food.get.v2',
                    food_id: '33691',
                    format: 'json'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
    
            // Send the response from the API to the client
            response.status(200).json(result.data);
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default controllerFoodInformationDetail;