import http from '../http-common';

class ShiftDataService {
  getAll() {
    return http.get('/shifts');
  }

  get(id) {
    return http.get(`/shifts/${id}`);
  }

  create(data) {
    return http.post('/shifts', data);
  }

  update(id, data) {
    return http.put(`/shifts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/shifts/${id}`);
  }

  deleteAll() {
    return http.delete(`/shifts`);
  }

  findByName(name) {
    return http.get(`/shifts?name=${name}`);
  }
}

export default new ShiftDataService();
