import http from '../axiosInstance';

class EmployeeDataService {
  getAll() {
    return http.get('/employees');
  }

  get(id) {
    return http.get(`/employees/id=${id}`);
  }

  create(data) {
    return http.post('/employees/add', data);
  }

  update(id, data) {
    return http.put(`/employees/${id}`, data);
  }

  updateDays(id, data) {
    return http.put(`/employees/days/${id}`, data);
  }


  updateTags(id, data) {
    return http.put(`/employees/tags/${id}`, data);
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
