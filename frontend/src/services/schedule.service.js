import axios from '../axiosInstance.js';

class ScheduleDataService {
  getAll() {
    return axios.get('/schedules');
  }
  getAllByBusiness(businessId) {
    return axios.get(`/schedules/business/${businessId}`);
  }

  get(id) {
    return axios.get(`/schedules/${id}`);
  }

  create(data) {
    return axios.post('/schedules', data);
  }

  fill(data) {
    return axios.post('/schedules/fill', data);
  }

  update(data) {
    return axios.put(`/schedules/`, data);
  }

  delete(id) {
    return axios.delete(`/schedules/${id}`);
  }

  deleteAll() {
    return axios.delete(`/schedules`);
  }

  findByName(name) {
    return axios.get(`/schedules?name=${name}`);
  }
}

export default new ScheduleDataService();
