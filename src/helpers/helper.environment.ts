// Import the environment interface
import { Environment } from './helper.types';

// Load environment variables from .env
import * as dotenv from 'dotenv';
dotenv.config();

// Export the environment variable
export const PORT  = process.env.TYPES_EXPRESS_PORT?.toString() as unknown as Environment;
export const APP_NAME  = process.env.TYPES_EXPRESS_NAME?.toString() as unknown as Environment;

//claude AI
export const CLAUDEAI_API_KEY  = process.env.TYPES_EXPRESS_CLAUDEAI_API_KEY?.toString() as unknown as Environment;
export const CLAUDEAI_PROMPT  = process.env.TYPES_EXPRESS_CLAUDEAI_PROMPT?.toString() as unknown as Environment;

//Api Ninjas - Nutrition
export const NUTRITION_API_KEY  = process.env.TYPES_EXPRESS_API_NINJAS_NUTRITION_API_KEY?.toString() as unknown as Environment;
