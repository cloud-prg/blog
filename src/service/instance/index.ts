import responseHandler, { jointResponse } from '@/utils/responseHandler';
import axios from 'axios';

const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

export const baseInstance = axios.create({
  // baseURL: `/${env}`,
  baseURL: `/dev`,
  timeout: 3000, // 3s
});

export const defaultInstance = axios.create({
  timeout: 3000, // 3s
});
defaultInstance.interceptors.response.use(responseHandler);
baseInstance.interceptors.response.use(responseHandler);

export const fetchInstance = ({
  method = "GET",
  url,
  headers = {
    'Content-Type': 'application/json',
  },
  body
}: any) => {
  return new Promise((resolve, reject) => {
    fetch(url, { method, headers, body: JSON.stringify(body), cache: 'no-store' })
      .then(response => {
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}