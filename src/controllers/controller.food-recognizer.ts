import { Request, Response } from 'express';
import { Anthropic } from '@anthropic-ai/sdk';
import axios from 'axios';

import {CLAUDEAI_API_KEY} from '../helpers/helper.environment'

// Inisialisasi client Anthropics
const anthropic = new Anthropic({ apiKey: `${CLAUDEAI_API_KEY}` });

const controllerFoodRecognizer = {
    getFoodName: async (request: Request, response: Response) => {
        try {
            // Pastikan request body memiliki properti 'imageData' yang berisi data gambar dalam format base64
                    // Pastikan request body memiliki properti 'imageUrl' yang berisi URL gambar
                    const { imageUrl } = request.body;
    
                    // Unduh gambar dari URL menggunakan Axios
                    await axios.get(imageUrl, { responseType: 'arraybuffer' }).then( async(result: any)=>{
                        // Konversi data gambar ke format base64
                        const imageData = Buffer.from(result.data).toString('base64');
                        // Kirim permintaan pengenalan gambar ke Anthropics
                    const finalResult = await anthropic.messages.create({
                            model: 'claude-3-opus-20240229',
                            max_tokens: 1024,
                            messages: [
                                {
                                    role: 'user',
                                    content: [
                                        {
                                            type: 'image',
                                            source: {
                                                type: 'base64',
                                                media_type: 'image/jpeg', // Ganti dengan tipe media gambar yang benar jika perlu
                                                data: imageData,
                                            },
                                        },
                                        {
                                            "type": "text",
                                            "text": "What food that shown in this picture, just say it, don't describe!"
                                        }                    
                                    ],
                                },
                            ],
                        });
    
                        // Tanggapi hasil pengenalan gambar
                        response.status(200).json(finalResult);
                    }).catch((error:any)=>{
                        console.error('Error recognizing image:', error);
                        response.status(500).json({ error: 'Internal Server Error' });
                    });
            
        } catch (error) {
            console.error('Error getFoodName function:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default controllerFoodRecognizer;