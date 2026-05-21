export interface SotkPersonel {
    id: number;
    name: string;
    role: string;
    image: string;
    active: boolean;
    sk_number?: string;
}

export interface OrganizationStructure {
    village_sotk: SotkPersonel[];
    bpd_otk: SotkPersonel[];
}