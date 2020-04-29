import { Product } from 'src/app/Common/Types/product';
import { Nullable } from 'src/app/Common/Types/nullable';

export interface ProductDetails{
    product: Product;
    comments: Nullable<string[]>;
    averageRating: Nullable<number>;
}