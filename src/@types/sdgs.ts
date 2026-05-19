export interface SdgsItem {
    goal: number;
    title: string;
    score: number;
    color: string; // Warna khas dari logo resmi SDGs
}

export interface SdgsCluster {
    clusterName: string;
    items: SdgsItem[];
}
