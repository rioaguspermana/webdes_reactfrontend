import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfilDesa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    // Use Zustand Store
    const { executeLogin, isLoading } = useAuthStore();
    const profilDesa = useProfileStore((state) => state.profilDesa);
    const { fetchPublicProfilDesa } = useProfileStore();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Ambil halaman asal, jika tidak ada arahkan ke /backoffice
    const from = location.state?.from?.pathname || '/backoffice';

    // Fetch data Profil Desa
    useEffect(() => {
        fetchPublicProfilDesa();
    }, [fetchPublicProfilDesa]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Panggil fungsi login terpisah dari Zustand
        const isSuccess = await executeLogin({ username, password });

        if (isSuccess) {
            navigate(from, { replace: true });
        }
    };


    return (
        <div className="w-full h-screen">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex-col justify-items-center">
                    <div className="">
                        {profilDesa?.logo_desa ?
                            <img
                                alt=""
                                src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, profilDesa.logo_desa)}
                                className="h-24 w-auto"
                            />
                            : <div className="h-24 w-auto"></div>
                        }
                    </div>
                    <h3 className="mt-10 text-xl/9 font-semibold tracking-tight">{profilDesa?.nama_desa}</h3>
                    <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                        Login dengan akun anda
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    required
                                    autoComplete="username"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                    disabled={isLoading}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                                    Password
                                </label>
                                <div className="hidden text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        Lupa Password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                    disabled={isLoading}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                color="blue"
                                className="mflex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        {/* Animasi loading sederhana */}
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Memverifikasi data...</span>
                                    </div>
                                ) : (
                                    'Masuk ke Dashboard'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;