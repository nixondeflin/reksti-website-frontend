import axios from 'axios';
const axiosInstance = axios.create({
      baseURL: 'http://localhost:3000', 
    
    });
    
    // const token = localStorage.getItem('token');
    // if (token) {
    //   axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }
    
    // Interceptor to log request errors
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          // Request made and server responded
          console.error('Error Response:', error.response.data);
          console.error('Error Status:', error.response.status);
          console.error('Error Headers:', error.response.headers);
        } else if (error.request) {
          // Request made but no response received
          console.error('Error Request:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error Message:', error.message);
        }
        return Promise.reject(error);
      }
    );
    
    
    export default axiosInstance;