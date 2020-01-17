import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.16.10.98:3339', 
});

export default api;