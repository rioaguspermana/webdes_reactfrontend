import type { ComponentType, SVGProps } from 'react';

export interface ContactNavigation {
    name: string;
    href: string;
}

export interface SocialNavItem {
    name: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface FooterNavigation {
    contact: ContactNavigation[];
}