import axios from 'axios';

const api = axios.create({
    baseURL: 'https://happy-1723.herokuapp.com/',
});

export default api;