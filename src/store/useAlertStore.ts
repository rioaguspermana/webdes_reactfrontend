import { create } from 'zustand';

// Jenis-jenis tema warna yang didukung
export type AlertTheme = 'success' | 'error' | 'warning' | 'info';

interface AlertState {
    isOpen: boolean;
    message: string;
    theme: AlertTheme;

    // Fungsi utama untuk memicu pemanggilan alert
    showAlert: (message: string, theme?: AlertTheme, duration?: number) => void;
    hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
    isOpen: false,
    message: '',
    theme: 'success',

    showAlert: (message, theme = 'success', duration = 3000) => {
        set({ isOpen: true, message, theme });

        // Otomatis tutup alert setelah durasi berakhir (default: 3 detik)
        setTimeout(() => {
            set({ isOpen: false });
        }, duration);
    },

    hideAlert: () => set({ isOpen: false })
}));
