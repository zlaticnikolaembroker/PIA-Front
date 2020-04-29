import { Nullable } from './nullable';

export interface Order {
    id: number;
    farmer_id: number;
    date_of_order: Date;
    status: string;
    date_of_completion: Nullable<Date>;
}