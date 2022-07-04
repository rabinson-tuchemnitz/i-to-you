import axios from 'axios';
import { httpClientAuthInstance } from '.';

export const getUploadedFiles = async () => {
  return await httpClientAuthInstance.get('/files/uploads');
};
