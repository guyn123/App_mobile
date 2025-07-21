// src/api.js
import axios from 'axios';

const api = axios.create({
baseURL: 'http://172.20.10.5:5555',
   // ví dụ http://192.168.1.10:8080
  withCredentials: true,
});

export default api;
