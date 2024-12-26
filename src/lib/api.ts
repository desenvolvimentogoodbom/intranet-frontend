import axios from "axios";

const api = axios.create({
  baseURL: "http://10.100.4.143:3000/api/v1",
  timeout: 3000,
});

export default api;