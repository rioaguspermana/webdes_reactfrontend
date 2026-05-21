export interface Potential {
    id: number;
    title: string;
    href: string;
    description: string;
    imageUrl: string;
    date: string;
    datetime: string;
    category: { title: string; href: string };
    author: {
        name: string;
        role: string;
        href: string;
        imageUrl: string;
    };
}
