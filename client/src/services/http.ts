import axios from 'axios';

const http = axios.create({
  // baseURL: 'https://text-based-rpg-server.vercel.app',
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;
