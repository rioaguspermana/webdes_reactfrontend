export const formatPhoneNumber = (phone: string): string => {
    const cleanNumber = phone.replace(/\D/g, '');

    if (cleanNumber.startsWith('0')) {
        return '62' + cleanNumber.slice(1);
    }

    return cleanNumber;
};