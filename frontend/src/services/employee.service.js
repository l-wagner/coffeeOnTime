import axios from '../axiosInstance';

class EmployeeDataService {
  getAll() {
    return axios.get(`/employees/`);
  }

  getAllByBusiness(businessId) {
    return axios.get(`/employees/business/${businessId}`);
  }

  get(id) {
    return axios.get(`/employees/id=${id}`);
  }

  create(data) {
    return axios.post('/employees/add', data);
  }

  update(id, data) {
    return axios.put(`/employees/${id}`, data);
  }

  updateTags(id, data) {
    return axios.put(`/employees/tags/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/employees/${id}`);
  }

  deleteAll() {
    return axios.delete(`/employees`);
  }

  findByName(name) {
    return axios.get(`/employees?name=${name}`);
  }
}

export default new EmployeeDataService();
