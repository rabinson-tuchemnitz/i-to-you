import axios from 'axios';
import { httpClientAuthInstance, httpClientOptionalAuthInstance } from '.';

export const getUploadedFiles = async () => {
  return await httpClientAuthInstance.get('/files/uploads');
};

export const requestFileChange = async (id, data) => {
  return await httpClientOptionalAuthInstance.post(
    '/files/change-request/' + id,
    data,
  );
};
