import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json',
  },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.data.data) {
      response.payload = response.data.data;

      return response;
    }
    if (response.data) {
      response.payload = response.data;
      return response;
    }
    return response;
  },

  function (error) {
  
    if (error.response) {
      error.payload = error.response.data;
      
      if (error.response.status === 401) {
        // Automatically redirect client to the login page
        // window.location.href = `${Config.AUTH_URL}/${Config.HOME_PAGE_PATH}`;
      }
    }
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosInstance;
