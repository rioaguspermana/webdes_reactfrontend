import { useAuthStore } from '@/store/useAuthStore';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const location = useLocation();

    // 1. Jika BELUM login, tendang ke /login
    // state={{ from: location }} berguna agar setelah login, user bisa kembali ke halaman asal
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Jika SUDAH login, render halaman rahasia di dalam <Outlet />
    return <Outlet />;
}
