import { create } from 'zustand'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { LoginPayload, LoginResponse, UserLogged } from '@/@types/auth';

interface AuthState {
    token: string | null;
    user: UserLogged | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    executeLogin: (payload: LoginPayload) => Promise<boolean>; // Mengembalikan true jika sukses
    logout: () => void;
}

const getInitialUser = (): UserLogged | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        return jwtDecode<UserLogged>(token);
    } catch {
        return null;
    }
};

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token'),
    user: getInitialUser(),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    executeLogin: async (payload) => {
        set({ isLoading: true, error: null });
        try {
            // Panggil API backend Go melalui Proxy Vite
            const response = await axios.post<LoginResponse>('/api/auth/login', payload);
            const { token } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                const decodedUser = jwtDecode<UserLogged>(token);
                set({ token, isAuthenticated: true, isLoading: false, user: decodedUser });
                return true;
            }

            set({ error: 'Token tidak valid dari server', isLoading: false });
            return false;
        } catch (err: any) {
            // Tangkap pesan eror dari backend Go Anda
            const msg = err.response?.data?.message || 'Gagal terhubung ke server Go';
            set({ error: msg, isLoading: false });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, isAuthenticated: false, error: null });
    },
}));
