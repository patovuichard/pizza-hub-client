import axios from "axios";

// With config.services BE calls can be made
const service = axios.create({
  baseURL: "http://localhost:5005/api",
});

// Token is going to join all calls
service.interceptors.request.use((config) => {
  // Before making the call, the Token is extracted from Local Storage
  const storedToken = localStorage.getItem("authToken");
  const tokenAndType = `Bearer ${storedToken}`;

  if (storedToken) {
    config.headers.authorization = tokenAndType;
  }

  return config;
});

export default service;
