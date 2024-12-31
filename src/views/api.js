import axios from 'axios';


// Create an Axios instance
const api = axios.create({
  baseURL: 'https://reportappb.onrender.com', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
