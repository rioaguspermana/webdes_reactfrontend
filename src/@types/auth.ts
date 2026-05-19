export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    nama_lengkap: string;
    jabatan: string;
}

export interface UserLogged {
    id: string;
    username: string;
    nama_lengkap: string;
    jabatan: string;
    foto_profil: string;
    exp: number;
}