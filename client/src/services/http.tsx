import axios from 'axios';

const http = axios.create({

    baseURL:"http://localhost:8082"
});

export default http;

