import axios from 'axios';

//import nutrition credential
import { NUTRITION_API_KEY } from '../helpers/helper.environment';

  const foodInformationDetailService = async(query: String)=>{
    
    const modifiedQuery = query.split(" ").join(" ")

    const finalResult  = await axios
      .get('https://api.api-ninjas.com/v1/nutrition', {
        params: { query: modifiedQuery},
        headers: {
          'X-Api-Key': `${NUTRITION_API_KEY}`,
        },
        timeout: 10000
      })
      .then((axiosResponse) => {
        const result = axiosResponse.data;
        return result;  
      });
      
      return finalResult;
  }

  export default foodInformationDetailService