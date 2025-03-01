import { useAuthStore } from '@/store/auth';
import axios from 'axios';

const Request = (headers: any) => {
  return axios.create({
    timeout: 30000,
    headers,
  });
};

export const sendRequestGET = async (baseURL: string, header?: any) => {
  const roleID = useAuthStore.getState().role;
  const headers = {
    ...header,
    ...(roleID && { 'app-role-id': roleID }),

  };

  console.log('HEADER', roleID);

  if (!header || !header['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  console.info('REQ', baseURL, headers);

  try {
    const response = await Request(headers).get(baseURL);

    console.info('RES', response);

    return response.data;
  } catch (error: any) {
    console.error('REQUEST ERROR', error);
    throw new Error(error?.response?.data?.message || error?.response?.data || error?.message);
  }
};

export const sendRequestPOST = async (baseURL: string, body?: any, header?: any) => {
  const roleID = useAuthStore.getState().role;
  const headers = {
    ...header,
    ...(roleID && { 'app-role-id': roleID }),

  };

  if (!header || !header['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  console.info('REQ', baseURL, headers, body);

  try {
    const response = await Request(headers).post(baseURL, body);

    console.info('RES', response);

    return response.data;
  } catch (error: any) {
    console.error('REQUEST ERROR', error);
    throw new Error(error?.response?.data?.message || error?.response?.data || error?.message);
  }
};

export const sendRequestPUT = async (baseURL: string, body?: any, header?: any) => {
  const roleID = useAuthStore.getState().role;
  const headers = {
    ...header,
    ...(roleID && { 'app-role-id': roleID }),

  };

  if (!header || !header['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  console.info('REQ', baseURL, headers, body);

  try {
    const response = await Request(headers).put(baseURL, body);

    console.info('RES', response);

    return response.data;
  } catch (error: any) {
    console.error('REQUEST ERROR', error);
    throw new Error(error?.response?.data?.message || error?.response?.data || error?.message);
  }
};

export const sendRequestDELETE = async (baseURL: string, header?: any) => {
  const roleID = useAuthStore.getState().role;
  const headers = {
    ...header,
    ...(roleID && { 'app-role-id': roleID }),

  };

  if (!header || !header['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  console.info('REQ', baseURL, headers);

  try {
    const response = await Request(headers).delete(baseURL);

    console.info('RES', response);

    return response.data;
  } catch (error: any) {
    console.error('REQUEST ERROR', error);
    throw new Error(error?.response?.data?.message || error?.response?.data || error?.message);
  }
};
