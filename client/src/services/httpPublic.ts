import axios from 'axios';

const httpPublic = axios.create({
  baseURL: 'https://text-based-rpg-server.vercel.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default httpPublic;
