import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Buat instance khusus dengan konfigurasi dasar
const auth = axios.create({
    baseURL: import.meta.env.VITE_APP_URL, // Sesuaikan URL backend Golang Anda
    headers: {
        'Accept': 'application/json',
    }
});

// Interceptor Request: Otomatis menyisipkan JWT Token sebelum request dikirim
auth.interceptors.request.use(
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

auth.interceptors.response.use(
    (response: AxiosResponse) => {
        // Jika request sukses, langsung teruskan responnya
        return response;
    },
    (error: AxiosError) => {
        // Jika backend Golang mengembalikan status 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            // Paksa browser pindah ke halaman login
            window.location.href = '/login';

            return new Promise(() => { });
        }

        return Promise.reject(error);
    }
);

export default auth;
