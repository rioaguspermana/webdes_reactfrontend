/**
 * Helper untuk menggabungkan Base URL dan Image Path dengan aman tanpa double slash.
 * @param basePath - URL dasar dari environment variable (VITE_APP_URL)
 * @param filePath - Path atau nama file gambar dari backend
 * @returns String URL yang sudah bersih dan valid
 */
export const cleanFileUrl = (basePath: string, filePath: string): string => {
    const rawUrl = `${basePath}/${filePath}`;

    return rawUrl.replace(/([^:]\/)\/+/g, "$1");
};
