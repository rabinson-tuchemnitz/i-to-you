import jwtDecode from 'jwt-decode';
import { getItem } from './storage';

export const getDecodedToken = () => {
  let token = getItem('token');
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

export const isAuthenticated = () => {
  let decodedToken = getDecodedToken();

  if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
    return true;
  }
  return false;
};
