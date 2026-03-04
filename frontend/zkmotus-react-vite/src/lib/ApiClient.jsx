import axios from "axios";
import Notification from "../layout/Notification";
import toast from "react-hot-toast";

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

    if (error?.response?.data?.message) {
      toast.custom((t) => {
        return (
          <Notification
            visible={t.visible}
            title="Something is wrong!"
            subtitle={` ${error.response.data.message}`}
          />
        );
      });
    }
    return Promise.reject(error);
  },
);

export default ApiClient;
