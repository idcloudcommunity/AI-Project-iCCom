import axios from 'axios';

//import services
import foodInformationDetailService from './service.food-information-detail';

//import Vision Package and credential
import { Anthropic } from '@anthropic-ai/sdk';
import { CLAUDEAI_API_KEY, CLAUDEAI_PROMPT } from '../helpers/helper.environment';

// Inisialisasi client Anthropics
const anthropic = new Anthropic({ apiKey: `${CLAUDEAI_API_KEY}` });

const foodRecognizerServices = async (imageUrl: any, foodWeight: number) => {
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

      const nutrition = await foodInformationDetailService(
        finalResult.content[0].text.toLowerCase()
      );

      const nutritionCalculated = {
        namaBahanMakanan: nutrition[0]["name"],
        kalori_kkal: ((nutrition[0]["calories"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["calories"]/100) * foodWeight) : ((nutrition[0]["calories"]/100) * foodWeight).toFixed(2) ,
        protein_gram: ((nutrition[0]["protein_g"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["protein_g"]/100) * foodWeight) : ((nutrition[0]["protein_g"]/100) * foodWeight).toFixed(2),
        serat_gram: ((nutrition[0]["fiber_g"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["fiber_g"]/100) * foodWeight) : ((nutrition[0]["fiber_g"]/100) * foodWeight).toFixed(2),
        gula_gram: ((nutrition[0]["sugar_g"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["sugar_g"]/100) * foodWeight) : ((nutrition[0]["sugar_g"]/100) * foodWeight).toFixed(2),
        karbohidratTotal_gram: ((nutrition[0]["carbohydrates_total_g"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["carbohydrates_total_g"]/100) * foodWeight) : ((nutrition[0]["carbohydrates_total_g"]/100) * foodWeight).toFixed(2),
        lemakTotal_gram: ((nutrition[0]["fat_total_g"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["fat_total_g"]/100) * foodWeight) : ((nutrition[0]["fat_total_g"]/100) * foodWeight).toFixed(2),
        lemakJenuh_gram: ((nutrition[0]["fat_saturated_g"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["fat_saturated_g"]/100) * foodWeight) : ((nutrition[0]["fat_saturated_g"]/100) * foodWeight).toFixed(2),
        kolesterol_miligram: ((nutrition[0]["cholesterol_mg"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["cholesterol_mg"]/100) * foodWeight) : ((nutrition[0]["cholesterol_mg"]/100) * foodWeight).toFixed(2),
        sodium_miligram: ((nutrition[0]["sodium_mg"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["sodium_mg"]/100) * foodWeight) : ((nutrition[0]["sodium_mg"]/100) * foodWeight).toFixed(2),
        potassium_miligram: ((nutrition[0]["potassium_mg"]/100) * foodWeight).toFixed(2).toString().split(".")[1] === "00" ? ((nutrition[0]["potassium_mg"]/100) * foodWeight) : ((nutrition[0]["potassium_mg"]/100) * foodWeight).toFixed(2),
      }

      return (foodSummary = {
        foodnName: finalResult.content[0].text.toLowerCase(),
        nutrition: nutritionCalculated,
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
