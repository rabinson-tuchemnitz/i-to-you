import axios from 'axios';
import { httpClientInstance } from '.';

export const loginUser = async (data) => {
  return await httpClientInstance.post('/users/login', data);
};

export const registerUser = async (data) => {
  return await httpClientInstance.post('/users/register', data);
};
