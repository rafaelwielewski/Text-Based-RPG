import http from './http';
import tokenService from './token.service';
import TokenService from './token.service';
import jwt_decode from 'jwt-decode';
import { UserJWT } from 'MyModels';

class AuthService {
  async login(username: string, password: string) {
    return http
      .post('/auth/signin', {
        username,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  async register(username: string, email: string, password: string) {
    return http
      .post('/auth/signup', {
        username,
        email,
        password
      })
      .then((response) => {
        return response.data;
      });
  }

  getUserId(): string {
    const user = jwt_decode<UserJWT>(tokenService.getUser().accessToken);
    return user.id;
  }
  getUsername(): string {
    const user = jwt_decode<UserJWT>(tokenService.getUser().accessToken);
    return user.username;
  }
}

export default new AuthService();
