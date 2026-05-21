export interface CarouselItem {
    id: string;
    title: string;
    sub_title: string;
    alt: string;
    image: string;
    urutan: number;
    is_active: boolean;
    created_at?: string;
}