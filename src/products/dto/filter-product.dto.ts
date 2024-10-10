export type ProductFilter = {
    name?: string;
    minPrice?: string;
    maxPrice?: string;
    minExpiration?: string;
    maxExpiration?: string;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
};