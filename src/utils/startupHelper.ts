import axios from 'axios';

declare var API_URL: string;
export const initAxios = (accessToken: string) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  axios.defaults.baseURL = API_URL;
};
