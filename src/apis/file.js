import axios from 'axios';
import {
  httpClientAuthInstance,
  httpClientInstance,
  httpClientOptionalAuthInstance,
} from '.';
import { getItem } from '../utils/storage';

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

export const getPendingRequests = async () => {
  return await httpClientAuthInstance.get('/files/pending-requests');
};

export const acceptPendingRequests = async (fileId, data) => {
  return await httpClientAuthInstance.patch('/files/update/' + fileId, data);
};

export const rejectPendingRequests = async (fileId) => {
  return await httpClientAuthInstance.delete('/files/change-request/' + fileId);
};
