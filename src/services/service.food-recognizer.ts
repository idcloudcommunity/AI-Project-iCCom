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

      const nutritions = await foodInformationDetailService(
        finalResult.content[0].text.toLowerCase().split(' - ')[0]
      );

      const modifiedNutritionArrayOfObject = nutritions.map((nutrition: any, indexNutritionKeysOfObject: number)=>{

        const modifiedFoodObjectKeys = [
          'nama_bahan_makanan',
          'kalori_kkal',
          'protein_gr',
          'serat_gr',
          'gula_gr',
          'karbohidrat_total_gr',
          'lemak_total_gr',
          'lemak_jenuh_gr',
          'kolesterol_mg',
          'sodium_mg',
          'potassium_mg'
        ]

        const nutritionKeys = Object.keys(nutrition).map((nutritionKey: any)=>{
          return nutritionKey
        }) 
        
        const modifiedFoodObject = modifiedFoodObjectKeys.reduce((acc, modifiedFoodObjectKey, indexModifiedFoodObject) => {

          const nameOfEachFood = finalResult.content[0].text.toLowerCase().split(' - ')[1].split(' dan ')[indexNutritionKeysOfObject] 
          const nutritionValue = (nutritions[indexNutritionKeysOfObject][`${nutritionKeys[indexModifiedFoodObject]}`]/100) * foodWeight

          return {
            ...acc,
            [modifiedFoodObjectKey]:nutritionKeys[indexModifiedFoodObject] === 'name' ? nameOfEachFood : parseFloat(nutritionValue.toFixed(1))
          };
        }, {});

        return modifiedFoodObject

      })

      return (foodSummary = {
        makanan_terdeteksi: finalResult.content[0].text.toLowerCase().split(' - ')[1],
        berat_tiap_makanan: `${foodWeight} gram`,
        rincian_gizi: modifiedNutritionArrayOfObject,
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
