import axios from 'axios';

const api = axios.create({
  baseUrl: "https://swapi.bry.com.br/api/"
});

export default api


