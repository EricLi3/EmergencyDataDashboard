import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://emergencydatadashboard.onrender.com/',
  baseURL: 'http://127.0.0.1:5000/',
});

export default instance;
