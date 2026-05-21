import axios, { InternalAxiosRequestConfig } from 'axios';

// Buat instance khusus dengan konfigurasi dasar
const api = axios.create({
    baseURL: import.meta.env.VITE_APP_URL, // Sesuaikan URL backend Golang Anda
    headers: {
        'Accept': 'application/json',
    }
});

// Interceptor Request: Otomatis menyisipkan JWT Token sebelum request dikirim
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('token');

        if (token && config.headers) {
            // Pasang token ke dalam header Authorization
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
