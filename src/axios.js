import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5000/api",
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        const response = await axios.post("/api/account/refresh-token", {
          refreshToken,
        });

        sessionStorage.setItem("authToken", response.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.refreshToken);

        error.config.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
