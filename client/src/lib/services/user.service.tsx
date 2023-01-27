import axios from 'axios';
import authHeader from './auth/auth-header';
import http from './http';


class UserService {
  getPublicContent() {
    return http.get('all');
  }

  getUserBoard() {
    return http.get('user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return http.get('mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get('admin', { headers: authHeader() });
  }
}

export default new UserService();