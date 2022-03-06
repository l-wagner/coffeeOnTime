import axios from '../axiosInstance.js';

class SetupDataService {
  getAll() {
    return axios.get('/business');
  }

  get(id) {
    return axios.get(`/business/${id}`);
  }

  create(data) {
    return axios.post('/business', data);
  }

  update(id, data) {
    return axios.put(`/business/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/business/${id}`);
  }

  deleteAll() {
    return axios.delete(`/business`);
  }

  findByName(name) {
    return axios.get(`/business?name=${name}`);
  }
}

export default new SetupDataService();
