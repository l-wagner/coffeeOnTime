import axios from '../axiosInstance.js';

class TagDataService {
  getAll() {
    return axios.get('/tags');
  }
  getAllByBusiness(businessId) {
    return axios.get(`/tags/business/${businessId}`);
  }

  get(id) {
    return axios.get(`/tags/${id}`);
  }

  create(data) {
    return axios.post('/tags', data);
  }

  update(id, data) {
    return axios.put(`/tags/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/tags/${id}`);
  }

  deleteAll() {
    return axios.delete(`/tags`);
  }

  findByName(name) {
    return axios.get(`/tags?name=${name}`);
  }
}

export default new TagDataService();
