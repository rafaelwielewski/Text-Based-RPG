import axios from 'axios';

const http = axios.create({
  baseURL: 'https://text-based-rpg-server.vercel.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;
