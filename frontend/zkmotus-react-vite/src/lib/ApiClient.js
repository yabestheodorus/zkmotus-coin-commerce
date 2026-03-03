import axios from "axios";

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// src/lib/apiClient.js

ApiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// src/lib/apiClient.js

ApiClient.interceptors.response.use(
  (response) => response.data, // return only data
  (error) => {
    if (error.response) {
      const status = error.response.status;
    }

    return Promise.reject(error);
  },
);

export default ApiClient;
