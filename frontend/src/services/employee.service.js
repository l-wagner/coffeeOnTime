import http from '../axiosInstance';

class EmployeeDataService {
  getAll() {
    return http.get('/employees');
  }

  get(id) {
    return http.get(`/employees/${id}`);
  }

  create(data) {
    return http.post('/employees/add', data);
  }

  update(id, data) {
    return http.put(`/employees/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employees/${id}`);
  }

  deleteAll() {
    return http.delete(`/employees`);
  }

  findByName(name) {
    return http.get(`/employees?name=${name}`);
  }
}

export default new EmployeeDataService();
