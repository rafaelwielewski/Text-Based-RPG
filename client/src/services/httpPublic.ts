import axios from 'axios';

const httpPublic = axios.create({
  // baseURL: 'https://text-based-rpg-server.vercel.app',
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default httpPublic;
