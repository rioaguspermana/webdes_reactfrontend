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
    executeLogin: (payload: LoginPayload) => Promise<boolean>;
    logout: () => void;
}

// Mengembalikan null jika token kedaluwarsa
const getInitialUserAndValidate = (): { user: UserLogged | null; token: string | null; isAuthenticated: boolean } => {
    const token = localStorage.getItem('token');
    if (!token) return { user: null, token: null, isAuthenticated: false };

    try {
        const decoded = jwtDecode<UserLogged>(token);
        const currentTime = Date.now() / 1000;

        // Cek apakah token memiliki klaim 'exp' dan sudah kedaluwarsa
        if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem('token'); // Hapus token busuk dari awal
            return { user: null, token: null, isAuthenticated: false };
        }

        return { user: decoded, token: token, isAuthenticated: true };
    } catch {
        localStorage.removeItem('token');
        return { user: null, token: null, isAuthenticated: false };
    }
};

// Ambil data validasi awal sebelum membuat store
const initialAuthState = getInitialUserAndValidate();

export const useAuthStore = create<AuthState>((set) => ({
    token: initialAuthState.token,
    user: initialAuthState.user,
    isAuthenticated: initialAuthState.isAuthenticated,
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
