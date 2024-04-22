import { Request, Response } from 'express';
import foodRecognizerServices from '../services/service.food-recognizer';

const controllerFoodRecognizer = {
  getFoodName: async (request: Request, response: Response) => {
    // Pastikan request body memiliki properti 'imageData' yang berisi data gambar dalam format base64
    // Pastikan request body memiliki properti 'imageUrl' yang berisi URL gambar
    const { imageUrl } = request.body;

    try {
      const finalResult = await foodRecognizerServices(imageUrl);    
      // Tanggapi hasil pengenalan gambar
      response.status(200).json(finalResult);
    } catch (error) {
      console.error('Error getFoodName function:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default controllerFoodRecognizer;
