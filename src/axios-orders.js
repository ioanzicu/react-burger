import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-burger-ecbd4.firebaseio.com/'
});

export default instance;
