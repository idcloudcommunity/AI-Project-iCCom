import express from 'express';

// Import environment variables
import { PORT, APP_NAME } from './src/helpers/helper.environment';

// Import controllers
import controllerFoodRecognizer from './src/controllers/controller.food-recognizer';
import controllerFoodInformationDetail from './src/controllers/controller.food-information-detail';

const app = express();

// Middleware to parse request bodies as JSON
app.use(express.json());

const { getFoodName } = controllerFoodRecognizer;
const { getFoodInformationDetail } = controllerFoodInformationDetail;

app.post('/food-image-recognize', getFoodName);
app.get('/food-information-detail', getFoodInformationDetail);

app.get('/', (req, res) => {
    res.send(`Welcome to ${APP_NAME}. The server is running.`);
    res.send(`Route lists:`);
    res.send(`[Route 1] [POST] ${'/food-image-recognize'}`);
    res.send(`[Route 2] [GET] ${'/food-information-detail'}`);
});

app.listen(PORT, () => {
    console.log('Welcome to', APP_NAME);
    console.log(`Server is running on http://localhost:${PORT}`);
});
