import { useAuthStore } from '@/store/useAuthStore';
import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoute() {
    const { isAuthenticated, token, logout } = useAuthStore();
    const location = useLocation();

    // 1. Jika BELUM login, tendang ke /login
    // state={{ from: location }} berguna agar setelah login, user bisa kembali ke halaman asal
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    try {
        if (token) {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            // Jika waktu sekarang lebih besar dari exp token, artinya expired
            if (decoded.exp) {
                if (decoded.exp < currentTime) {
                    logout();
                    return <Navigate to="/login" replace />;
                }
            }

        }
    } catch (error) {
        logout();
        return <Navigate to="/login" replace />;
    }

    // 2. Jika SUDAH login, render halaman rahasia di dalam <Outlet />
    return <Outlet />;
}
