import axios from '../axiosInstance.js';

class ShiftDataService {
  getAll() {
    return axios.get('/shifts');
  }

  get(id) {
    return axios.get(`/shifts/${id}`);
  }

  create(data) {
    return axios.post('/shifts', data);
  }

  update(id, data) {
    return axios.put(`/shifts/${id}`, data);
  }

  updateTags(id, data) {
    return axios.put(`/shifts/tags/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/shifts/${id}`);
  }

  deleteAll() {
    return axios.delete(`/shifts`);
  }

  findByName(name) {
    return axios.get(`/shifts?name=${name}`);
  }
}

export default new ShiftDataService();
