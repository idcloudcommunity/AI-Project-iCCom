import { Request, Response } from 'express';

//import services
import foodInformationDetailService from '../services/service.food-information-detail';

interface Nurtrition {
    foodName: String
}

const controllerFoodInformationDetail = {
  getFoodInformationDetail: async (request: Request, response: Response) => {
    try {

        const nutrition: Nurtrition = request.body;
        const query: String = nutrition.foodName || 'tofu and tempeh';

      const finalResult = await foodInformationDetailService(query);
      // Send the response from the API to the client
      response.status(200).json(finalResult);
    } catch (error: any) {
      // Handle errors
      console.error('Error:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default controllerFoodInformationDetail;
