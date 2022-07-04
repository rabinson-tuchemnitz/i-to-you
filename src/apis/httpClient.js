import axios from 'axios';

const config = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: process.env.REACT_APP_TIMEOUT,
};

export default (axiosConfig) =>
  axios.create({
    ...config,
    ...axiosConfig,
  });
