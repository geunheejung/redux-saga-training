import axios from 'axios';

class Api {
  API_KEY = '36785efffd7344a0dd4e7c49b21e407b'; 
  API_URL = `api.openweathermap.org/data/2.5/weather?q=London` 
  CITY_NAME = 'London';

  fetchApi = () => {
    try {
      const response = axios.post(this.API_URL);
      return response;
    } catch (e) {
      console.error(e);
    }    
  }
}

export default Object.freeze(new Api());