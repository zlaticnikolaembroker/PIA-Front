import { Nullable } from 'src/app/Common/Types/nullable';

export interface OrderDetails {
    id: number;
    farmername: string;
    date_of_order: Date;
    status: string;
    date_of_completion: Nullable<Date>;
}