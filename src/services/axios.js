// services/axios.js
import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/api";

const instance = axios.create({
    baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    const res = await axios.post(`${API_BASE_URL}/token/refresh/`, {
                        refresh: refreshToken,
                    });

                    console.log("try to use refresh token");

                    localStorage.setItem('token', res.data.access);
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;

                    return instance(originalRequest); // Retry request with new token
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                }
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
