import axios, {AxiosError, AxiosResponse} from 'axios';

const baseURL = __DEV__
  ? 'http://api.vodiy-yulduzlari.uz'
  : 'http://api.vodiy-yulduzlari.uz';

export const api = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

class APIError {
  status: number;

  message?: string;

  constructor(message: string, status: number) {
    this.status = status;
    this.message = message;
  }
}

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data;
  },
  (err: AxiosError) => {
    const status = err.response?.status || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        return Promise.reject(new APIError(err.message, 401));
      }

      // forbidden (permission related issues)
      case 403: {
        return Promise.reject(new APIError(err.message, 403));
      }

      // bad request
      case 400: {
        return Promise.reject(new APIError(err.message, 400));
      }

      // not found
      case 404: {
        return Promise.reject(new APIError(err.message, 404));
      }

      // conflict
      case 409: {
        return Promise.reject(new APIError(err.message, 409));
      }

      // unprocessable
      case 422: {
        return Promise.reject(err.response?.data);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(new APIError(err.message, 500));
      }
    }
  },
);

export const setToken = (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};
