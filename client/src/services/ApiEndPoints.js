import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3030',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export const get = (url, params) => instance.get(url, {params});
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleted = (url) => instance.delete(url);

instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log('error', error);
    return Promise.reject(error);
  });