import axios from '../axiosInstance.js';

class AuthService {
  login(data) {
    return axios.post('/auth', data);
  }
}
export default new AuthService();
