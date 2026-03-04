// src/lib/api.js
import ApiClient from "./ApiClient.jsx";

export const get = (url, params = {}, config = {}) =>
  ApiClient.get(url, { params, ...config });

export const post = (url, data = {}, config = {}) =>
  ApiClient.post(url, data, config);

export const put = (url, data = {}, config = {}) =>
  ApiClient.put(url, data, config);

// export const delete = (url, config = {}) => ApiClient.delete(url, config)
