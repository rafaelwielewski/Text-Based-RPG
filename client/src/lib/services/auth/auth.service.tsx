import { setAuthToken } from "@/lib/api/setAuthToken";
import http from "@/lib/services/http";
import { useRouter } from "next/router";

class AuthService {



  login = async (username, password) => {

    try {
      http.post("auth/signin", {
        username,
        password
      })
      .then(async response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data)
          setAuthToken(response.data.accessToken)

        }
        console.log(response.data)
        return await response.data;
      });

    } catch (e) {
      console.log(e);
    }

  };

  async logout() {

    try {

      const response = await http.get(`/auth/logout`);
      console.log(response)

    } catch (e) {
      console.log(e);
    }

 
    localStorage.removeItem("user");
  }

  async register(username, email, password) {
    return http.post("auth/signup", {
      username,
      email,
      password
    });
  }

  async decodeJwt(token) {
    var base64Payload = token.split(".")[1];
    var payloadBuffer = Buffer.from(base64Payload, "base64");
    return JSON.parse(payloadBuffer.toString());

  }

  async getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    const decodedJwt = this.decodeJwt(user.accessToken);
    return decodedJwt
  }
  async isAuth() {
    const user = localStorage.getItem('user');
    return user
  }
}

export default new AuthService();