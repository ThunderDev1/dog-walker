import axios from 'axios';
import {ToastsStore} from 'react-toasts';

declare var API_URL: string;

const isHandlerEnabled = (config: any = {}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true;
};

const errorHandler = (error: any) => {
  if (isHandlerEnabled(error.config)) {
    error.message && ToastsStore.error(error.message);
    console.log(error);
  }
  return Promise.reject({...error});
};

const successHandler = (response: any) => {
  return response;
};

export const initAxios = (accessToken: string) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  axios.defaults.baseURL = API_URL;
  axios.interceptors.response.use(response => successHandler(response), error => errorHandler(error));
};
