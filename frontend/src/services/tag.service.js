import http from '../axiosInstance';

class TagDataService {
  getAll() {
    return http.get('/tags');
  }

  get(id) {
    return http.get(`/tags/${id}`);
  }

  create(data) {
    return http.post('/tags', data);
  }

  update(id, data) {
    return http.put(`/tags/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tags/${id}`);
  }

  deleteAll() {
    return http.delete(`/tags`);
  }

  findByName(name) {
    return http.get(`/tags?name=${name}`);
  }
}

export default new TagDataService();
