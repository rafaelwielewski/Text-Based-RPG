import http from "@/services/http";
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

    
  async login(username, password) {
    return http.post("auth/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(JSON.parse(localStorage.getItem('user')))
        return response.data;
      });
  }

  async logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password) {
    return http.post("auth/signup", {
      username,
      email,
      password
    });
  }

  async getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();