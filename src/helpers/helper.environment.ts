// Import the environment interface
import { Environment } from './helper.types';

// Load environment variables from .env
import * as dotenv from 'dotenv';
dotenv.config();

// Export the environment variable
export const PORT  = process.env.TYPES_EXPRESS_PORT as unknown as Environment;
export const APP_NAME  = process.env.TYPES_EXPRESS_NAME as unknown as Environment;
export const CLAUDEAI_API_KEY  = process.env.TYPES_EXPRESS_CLAUDEAI_API_KEY?.toString() as unknown as Environment;
