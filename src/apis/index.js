import httpClient from './httpClient';
import convertJsonToFormData from '../utils/convertJsonToFormData';
import { getItem, removeItem } from '../utils/storage';

export const httpClientInstance = httpClient({
  transformRequest: [
    (data, headers) => {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';

      return JSON.stringify(data);
    },
  ],
});

export const httpClientMultipartInstance = httpClient({
  transformRequest: [
    (data, headers) => {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'multipart/form-data';

      return convertJsonToFormData(data);
    },
  ],
});

export const httpClientAuthInstance = httpClient({
  transformRequest: [
    (data, headers) => {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
      headers['Authorization'] = `Bearer ${getItem('token')}`;

      return JSON.stringify(data);
    },
  ],
  validateStatus: function (status) {
    if (status === 401) {
      removeItem('token');
      window.location.reload();
    }
    return status >= 200 && status < 300;
  },
});

export const httpClientMultipartAuthInstance = httpClient({
  transformRequest: [
    (data, headers) => {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'multipart/form-data';
      headers['Authorization'] = `Bearer ${getItem('token')}`;

      return convertJsonToFormData(data);
    },
  ],
});

export const httpClientBlobAuthInstance = httpClient({
  responseType: 'blob',
  transformRequest: [
    (data, headers) => {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'multipart/form-data';
      headers['Authorization'] = `Bearer ${getItem('token')}`;

      return convertJsonToFormData(data);
    },
  ],
});
