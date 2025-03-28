import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://emergencydatadashboard.onrender.com/',
});

export default instance;
