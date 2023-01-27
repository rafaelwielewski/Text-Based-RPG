import http from "@/lib/services/http";

class AuthService {

  login = async (username, password) => {
    
    try {
      http.post("auth/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });

    } catch (e) {
      console.log(e);
    }

  };

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
}

export default new AuthService();