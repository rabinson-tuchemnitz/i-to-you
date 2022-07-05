import axios from 'axios';
import {
  httpClientAuthInstance,
  httpClientInstance,
  httpClientOptionalAuthInstance,
} from '.';

export const getUploadedFiles = async () => {
  return await httpClientAuthInstance.get('/files/uploads');
};

export const getFileDetail = async (id) => {
  return await httpClientInstance.get('/files/' + id);
};

export const requestFileChange = async (id, data) => {
  return await httpClientOptionalAuthInstance.post(
    '/files/change-request/' + id,
    data,
  );
};
