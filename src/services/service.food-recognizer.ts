import axios from 'axios';

//import services
import foodInformationDetailService from './service.food-information-detail';

//import Vision Package and credential
import { Anthropic } from '@anthropic-ai/sdk';
import { CLAUDEAI_API_KEY, CLAUDEAI_PROMPT } from '../helpers/helper.environment';

// Inisialisasi client Anthropics
const anthropic = new Anthropic({ apiKey: `${CLAUDEAI_API_KEY}` });

const foodRecognizerServices = async (imageUrl: any) => {
  // Unduh gambar dari URL menggunakan Axios
  const recognizedFood = await axios
    .get(imageUrl, { responseType: 'arraybuffer', timeout: 10000 })
    .then(async (result: any) => {
      // Konversi data gambar ke format base64
      const imageData = Buffer.from(result.data).toString('base64');

      // Determine the image media type dynamically
      const mediaType: any =
        getImageMediaType(result.headers['content-type']) || 'image/jpeg';

      // Kirim permintaan pengenalan gambar ke Anthropics
      const imageRecognized: any = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType, // Ganti dengan tipe media gambar yang benar jika perlu
                  data: imageData,
                },
              },
              {
                type: 'text',
                text: `${CLAUDEAI_PROMPT}`,
              },
            ],
          },
        ],
      });

      return imageRecognized;
    })
    .then(async (finalResult: any) => {
      let foodSummary: any = {};

      console.log(
        'makanan terdeteksi',
        finalResult.content[0].text.toLowerCase()
      );
      const nutrition = await foodInformationDetailService(
        finalResult.content[0].text.toLowerCase()
      );

      return (foodSummary = {
        foodnName: finalResult.content[0].text.toLowerCase(),
        nutrition,
      });
    })
    .catch((error: any) => {
      console.error('Error recognizing image:', error);
    });

  return recognizedFood;
};

// Function to determine the image media type dynamically
const getImageMediaType = (contentType: string): string => {
  // Example implementation, adjust as needed
  if (contentType.startsWith('image/jpeg')) {
    return 'image/jpeg';
  } else if (contentType.startsWith('image/png')) {
    return 'image/png';
  } else if (contentType.startsWith('image/gif')) {
    return 'image/gif';
  } else {
    // Default to 'image/jpeg' if the format cannot be determined
    return 'image/jpeg';
  }
};

export default foodRecognizerServices;
