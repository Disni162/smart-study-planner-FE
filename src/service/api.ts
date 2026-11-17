import axios from "axios";

const api = axios.create({
  baseURL: "https://study-planner-app-be-i6jl.vercel.app/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message;

    if (
      err.response?.status === 401 &&
      message === "Token expired"
    ) {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");

      // Redirect only if not already on login page
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(err);
  }
);

export default api;