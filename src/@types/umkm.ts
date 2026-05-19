export interface UmkmProduct {
    id: number;
    name: string;
    href: string;
    price: string;
    description: string;
    options: string;
    imageUrl: string;
    // Parameter tambahan yang disarankan:
    sellerName: string;
    whatsappNumber: string;
    stockStatus: 'Tersedia' | 'Pre-Order' | 'Habis';
}

// Format response standar dari backend Go untuk data berpaginasi
export interface PaginatedProductResponse {
    data: UmkmProduct[];
    pagination: {
        total_records: number;
        current_page: number;
        total_pages: number;
        limit: number;
    };
}
