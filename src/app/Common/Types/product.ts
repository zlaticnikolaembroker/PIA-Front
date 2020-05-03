import { Nullable } from './nullable';

export interface Product {
    id: number;
    name: string;
    price: number;
    available: number;
    company_id: number;
    archived: Nullable<boolean>;
}