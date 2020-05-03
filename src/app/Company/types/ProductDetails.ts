import { Product } from 'src/app/Common/Types/product';
import { Nullable } from 'src/app/Common/Types/nullable';

export interface ProductDetails{
    name: string;
    price: number;
    available: number;
    comments: Nullable<string>;
    averagerating: Nullable<number>;
    archived: Nullable<boolean>;
}