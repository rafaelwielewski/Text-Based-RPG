import axios from 'axios';

const http = axios.create({

    baseURL:"http://186.211.97.242:8082"
});

export default http;

