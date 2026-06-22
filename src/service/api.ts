import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* HANDLE TOKEN EXPIRE */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message;

    if (
      err.response?.status === 401 &&
      message === "Token expired"
    ) {
      alert("Session expired. Please login again.");

      localStorage.removeItem("ACCESS_TOKEN");

      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default api;